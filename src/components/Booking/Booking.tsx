/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import { FaSpinner } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
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

interface BookingProps {
  id: string;
}
type SelectedDate = Date | null;
type SelectedSlots = { slotId: string; date: string; time: string }[];

const Booking = ({ id }: BookingProps) => {
  const { data: booking, isFetching } = useGetRoomByIdQuery(id);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(null);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlots>([]);
  const [formatedDate, setFormatedDate] = useState<string | undefined | null>(
    undefined
  );

  const { register, handleSubmit } = useForm();
  const user = useAppSelector(userCurrentUser);
  const dispatch = useAppDispatch();
  const { data, isFetching: slotFetch } = useGetAllSlotQuery(formatedDate);

  const getSlots = data as unknown as { data: any[] };
  const roomId = booking?.data?._id;
  const availableSlot = getSlots?.data?.filter(
    (room) => room?.room?._id === roomId
  );

  const availableDates =
    availableSlot?.map((slot) => parseISO(slot?.date)) || [];

  const match = formatedDate
    ? getSlots?.data?.filter((item) => item?.date === formatedDate)
    : availableSlot;

  const matchDates = match?.map((slot) => parseISO(slot?.date)) || [];

  const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");

  const getDayClassName = (date: Date): string => {
    const dateStr = formatDate(date);
    const matchDatesStr = matchDates.map((d) => formatDate(d));
    const isMatchedDate = matchDatesStr.includes(dateStr);
    const isSelectedDate = selectedDate && formatDate(selectedDate) === dateStr;

    let className = "";

    if (isMatchedDate) {
      className += " bg-red-500 text-white rounded-full";
    }

    if (isSelectedDate) {
      className += " selected-date-class";
    }

    return className;
  };

  const handleSlotClick = (
    slotId: string,
    date: string,
    startTime: string,
    endTime: string
  ) => {
    const timeSlot = `${startTime} - ${endTime}`;
    setSelectedSlots(
      (prev) =>
        prev.some((slot) => slot.slotId === slotId)
          ? prev.filter((s) => s.slotId !== slotId) // Deselect if already selected
          : [...prev, { slotId, date, time: timeSlot }] // Add if new
    );
  };

  const handleDeselectSlot = (slotId: string) => {
    setSelectedSlots((prev) => prev.filter((s) => s.slotId !== slotId));
  };

  const formatSlotTime = (startTime: string, endTime: string) =>
    `${startTime} - ${endTime}`;

  const handleBooking = (data: any) => {
    if (selectedSlots.length === 0) {
      return toast.error("Please select at least one slot");
    }

    const userInfo = {
      title: data.title,
      description: data.description,
      userId: user?.userId,
      roomId: booking?.data?.id,
      slots: selectedSlots.map((slot) => slot.slotId),
    };

    console.log(userInfo);
  };

  return (
    <>
      {isFetching || slotFetch ? (
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
                {selectedSlots.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSlots.map((slot) => (
                      <div
                        key={slot.slotId}
                        className="bg-gray-200 border text-sm py-1 rounded-full flex items-center px-2 gap-1"
                      >
                        <span>{` ${slot.time}`}</span>
                        <DeleteIcon
                          onClick={() => handleDeselectSlot(slot.slotId)}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {match && match.length > 0 ? (
                  <>
                    <h2 className="text-xl font-semibold mb-4">
                      Available Slots{" "}
                      {formatedDate ? (
                        <small>({formatedDate})</small>
                      ) : (
                        <small>(All slots of this room)</small>
                      )}
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
                            selectedSlots.find((s) => s.slotId === slot.id)
                              ? "bg-blue-600 text-white"
                              : ""
                          }`}
                        >
                          <span>
                            {format(parseISO(slot.date), "yyyy-MM-dd")}
                          </span>
                          <span>
                            {formatSlotTime(slot.startTime, slot.endTime)}
                          </span>
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
      )}
    </>
  );
};

export default Booking;
