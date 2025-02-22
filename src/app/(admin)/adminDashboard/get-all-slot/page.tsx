/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useGetAllSlotQuery } from "@/redux/feature/room/roomApi";
import { useDeleteSlotMutation } from "@/redux/feature/slot/slotApi";
import Loading from "@/utils/loading";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import Image from "next/image";
import { toast } from "sonner";

type Slot = {
  id: string;
  room: {
    name: string;
    image: string;
  };
  date: string;
  startTime: string;
  endTime: string;
};

const GetAllSlot = () => {
  const { data: slot, isLoading } = useGetAllSlotQuery(undefined);

  const [deleteRoom] = useDeleteSlotMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteRoom(id).unwrap();
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete room.");
    }
  };

  return (
    <div className="p-6 pt-10">
      {isLoading && <Loading />}
      <Table isStriped aria-label="Meeting Rooms Table">
        <TableHeader>
          <TableColumn>Room Image</TableColumn>
          <TableColumn>Roo NAME</TableColumn>
          <TableColumn>Slot Date</TableColumn>
          <TableColumn>Slot StartTime</TableColumn>
          <TableColumn>Slot EndTime</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {slot?.data?.map((slot: Slot) => (
            <TableRow key={slot?.id}>
              <TableCell>
                <Image
                  src={slot?.room.image || "/default-room.jpg"}
                  alt={slot?.room.name}
                  width="50"
                  height="50"
                  className="rounded"
                />
              </TableCell>
              <TableCell>{slot?.room.name}</TableCell>
              <TableCell>{slot?.date}</TableCell>
              <TableCell>{slot?.startTime}</TableCell>
              <TableCell>{slot?.endTime}</TableCell>

              <TableCell>
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(slot.id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GetAllSlot;
