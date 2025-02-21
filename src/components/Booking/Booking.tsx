/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { FaSpinner } from "react-icons/fa";
import { useAppSelector } from "../../redux/hook";
import { toast } from "sonner";
import {
  useGetAllSlotQuery,
  useGetRoomByIdQuery,
} from "@/redux/feature/room/roomApi";
import { userCurrentUser } from "@/redux/feature/auth/authSlice";
import Image from "next/image";
import { Button } from "@heroui/button";
import { DeleteIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateBookingMutation } from "@/redux/feature/booking/bookingApi";

interface BookingProps {
  id: string;
}
type SelectedSlot = { slotId: string; date: string; time: string };

const Booking = ({ id }: BookingProps) => {
  const { data: booking, isFetching } = useGetRoomByIdQuery(id);
  const [createBooking] = useCreateBookingMutation();

  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [formatedDate, setFormatedDate] = useState<string | null>(null);

  const { register, handleSubmit } = useForm();
  const user = useAppSelector(userCurrentUser);
  const { data, isFetching: slotFetch } = useGetAllSlotQuery(formatedDate);

  const getSlots = data as { data: any[] };
  const roomId = booking?.data?._id;
  const availableSlot = getSlots?.data?.filter(
    (room) => room?.room?._id === roomId
  );

  const match = formatedDate
    ? getSlots?.data?.filter((item) => item?.date === formatedDate)
    : availableSlot;

  const handleSlotClick = (
    slotId: string,
    date: string,
    startTime: string,
    endTime: string
  ) => {
    const timeSlot = `${startTime} - ${endTime}`;
    setSelectedSlot((prev) =>
      prev?.slotId === slotId ? null : { slotId, date, time: timeSlot }
    );
  };

  const handleBooking = async (data: any) => {
    if (!selectedSlot) {
      return toast.error("Please select a slot.");
    }

    const bookingData = {
      title: data.title,
      description: data.description,
      userId: user?.userId,
      roomId: booking?.data?.id,
      slotId: selectedSlot.slotId,
    };

    // console.log("Booking Data:", bookingData);
    try {
      const res = await createBooking(bookingData).unwrap();
      toast.success(res.message);
      setSelectedSlot(null);
    } catch (error: any) {
      toast.error(error?.message || "Failed to create booking.");
    }
  };

  return isFetching || slotFetch ? (
    <div className="flex items-center justify-center h-[80vh]">
      <FaSpinner fontSize={"3rem"} className="animate-spin" />
    </div>
  ) : (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="lg:w-[900px] mx-auto mt-5 rounded-md">
        <Image
          width={400}
          height={300}
          className="w-full h-[300px] object-cover rounded-md"
          src={booking?.data?.image || "/placeholder.jpg"}
          alt="Room Image"
        />
        <div className="flex border p-3 rounded-md lg:flex-row md:flex-row flex-col-reverse justify-center items-start lg:gap-20 md:gap-20 gap-10 mt-4 text-center px-10 pb-3">
          <div className="lg:w-[50%] md:w-[50%]">
            {selectedSlot && (
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="bg-gray-200 border text-sm py-1 rounded-full flex items-center px-2 gap-1">
                  <span>{selectedSlot.time}</span>
                  <DeleteIcon
                    onClick={() => setSelectedSlot(null)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            )}
            {match?.length > 0 ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Available Slots{" "}
                  <small>({formatedDate || "All slots of this room"})</small>
                </h2>
                <div className="flex flex-col gap-4 mx-auto w-full">
                  {match.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() =>
                        handleSlotClick(
                          slot.id,
                          slot.date,
                          slot.startTime,
                          slot.endTime
                        )
                      }
                      className={`text-lg border px-8 py-2 rounded-md border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-between cursor-pointer font-semibold ${
                        selectedSlot?.slotId === slot.id
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                    >
                      <span>{format(parseISO(slot.date), "yyyy-MM-dd")}</span>
                      <span>{`${slot.startTime} - ${slot.endTime}`}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-3xl font-semibold h-[60vh] flex items-center justify-center text-center">
                No slots available
              </p>
            )}
          </div>
          <div className="lg:flex-1 w-full">
            <form onSubmit={handleSubmit(handleBooking)}>
              <label className="font-semibold">Title</label>
              <input
                {...register("title", { required: true })}
                className="border p-2 rounded-md w-full"
                placeholder="Enter title"
              />

              <label className="font-semibold">Description</label>
              <textarea
                {...register("description", { required: true })}
                className="border p-2 rounded-md w-full"
                placeholder="Enter description"
              ></textarea>

              <Button type="submit" className="w-full h-[45px] mt-3">
                Booking
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
