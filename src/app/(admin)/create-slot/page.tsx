/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaSpinner } from "react-icons/fa";
import { FieldValues } from "react-hook-form";
import moment from "moment";

import { toast } from "sonner";

import TechForm from "@/components/form/TechForm/TechForm";
import { useCreateSlotMutation } from "@/redux/feature/slot/slotApi";
import { useGetAllRoomQuery } from "@/redux/feature/meeting/meetingApi";
import TechSelect from "@/components/form/TechSelect/TechSelect";
import TechDatePicker from "@/components/form/TechDatePicker/TechDatePicker";
import TechTimePicker from "@/components/form/TechTImePicker/TechTimePicker";
import { Button } from "@heroui/button";

interface Room {
  id: string;
  name: string;
}

const CreateSlot = () => {
  const [creatSlot] = useCreateSlotMutation();
  const { data: rooms, isFetching } = useGetAllRoomQuery({});
  console.log(rooms?.data);

  // const navigation = useNavigate();

  const roomsOption = rooms?.data?.map((item: Room) => ({
    key: item.id,
    label: item.name,
  }));
  const handleCreateSlot = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Creating...");

    const formattedStartTime = moment(data.startTime, "HH:mm");
    const formattedEndTime = moment(data.endTime, "HH:mm");

    // Validation: Ensure endTime is after startTime
    if (!formattedStartTime.isBefore(formattedEndTime)) {
      toast.error("End time must be after start time.");
      toast.dismiss(toastId);
      return;
    }

    const slotData = {
      ...data,
      roomId: data?.room,
      date: moment(data.date).format("YYYY-MM-DD"),
      startTime: formattedStartTime.format("HH:mm"),
      endTime: formattedEndTime.format("HH:mm"),
    };

    console.log("slodata", slotData);

    try {
      const res = await creatSlot(slotData);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.data.message, { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex items-center justify-center p-40">
      <div className=" max-w-[1031px] w-full mx-auto border p-10  rounded-lg">
        <h2 className="text-xl font-semibold mb-5 text-center">Create Slot</h2>
        {isFetching ? (
          <div className="flex items-center justify-center h-[80vh]">
            <FaSpinner fontSize={"3rem"} className="animate-spin" />
          </div>
        ) : (
          <TechForm onSubmit={handleCreateSlot}>
            <div className="flex lg:flex-row md:flex-row flex-col items-center gap-4 mb-4">
              <div className="flex-1 w-full">
                <TechSelect
                  name="room"
                  options={roomsOption}
                  label="Room"
                  radius="none"
                  variant="bordered"
                />
              </div>
              <div className="flex-1 w-full">
                <TechDatePicker
                  name="date"
                  label="Date"
                  radius="none"
                  variant="bordered"
                />
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col items-center gap-4">
              <div className="flex-1 w-full">
                <TechTimePicker name="startTime" label="Start Time" />
              </div>
              <div className="flex-1 w-full">
                <TechTimePicker name="endTime" label="End Time" />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-4 px-4 py-2 bg-[#4E7776] text-white rounded w-full"
              disabled={isFetching}
            >
              Create Slot
            </Button>
          </TechForm>
        )}
      </div>
    </div>
  );
};

export default CreateSlot;
