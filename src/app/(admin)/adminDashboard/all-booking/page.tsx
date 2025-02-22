"use client";

import { useGetAllBookingQuery } from "@/redux/feature/booking/bookingApi";
import { useDeleteRoomMutation } from "@/redux/feature/room/roomApi";
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

const GetAllBooking = () => {
  const { data: booking, isLoading } = useGetAllBookingQuery(undefined);
  const [deleteBooking] = useDeleteRoomMutation();

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id).unwrap();
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error(err?.error);
    }
  };

  return (
    <div className="p-6 pt-10 container mx-auto h-[80vh]">
      {isLoading && <Loading />}
      <Table isStriped aria-label="Meeting Rooms Table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>StartTime</TableColumn>
          <TableColumn>EndTime</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {booking?.data?.map((book) => (
            <TableRow key={book.id}>
              <TableCell>
                <Image
                  src={book?.room?.image || "/default-room.jpg"}
                  alt={book?.room?.name}
                  width="50"
                  height="50"
                  className="rounded"
                />
              </TableCell>
              <TableCell>{book?.room?.name}</TableCell>
              <TableCell>{book?.slots?.date}</TableCell>
              <TableCell>{book?.slots?.startTime}</TableCell>
              <TableCell>{book?.slots?.endTime}</TableCell>
              <TableCell>
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(book.id)}
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

export default GetAllBooking;
