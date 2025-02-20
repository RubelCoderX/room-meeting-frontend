"use client";

import {
  useGetAllRoomQuery,
  useDeleteRoomMutation,
} from "@/redux/feature/room/roomApi";
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

const GetAllRoom = () => {
  const { data: rooms, isLoading } = useGetAllRoomQuery(undefined);
  const [deleteRoom] = useDeleteRoomMutation();

  const handleDelete = async (id) => {
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
          <TableColumn>Image</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>Capacity</TableColumn>
          <TableColumn>Amenities</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {rooms?.data?.map((room) => (
            <TableRow key={room.id}>
              <TableCell>
                <Image
                  src={room.image || "/default-room.jpg"}
                  alt={room.name}
                  width="50"
                  height="50"
                  className="rounded"
                />
              </TableCell>
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>{room.amenities?.join(", ") || "N/A"}</TableCell>
              <TableCell>
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(room.id)}
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

export default GetAllRoom;
