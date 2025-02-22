/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useGetMyBookingQuery,
  useDeleteBookingMutation,
} from "@/redux/feature/booking/bookingApi";
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

type IBooking = {
  id: string;
  room: {
    name: string;
    image: string;
  };
  slots: {
    date: string;
    startTime: string;
    endTime: string;
  };
};

const GetMyBooking = () => {
  const { data: booking, isLoading } = useGetMyBookingQuery(undefined);
  const [deleteBooking] = useDeleteBookingMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id).unwrap();
      toast.success("Booking deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete booking.");
    }
  };

  return (
    <div className="p-6 pt-10 container mx-auto h-[80vh]">
      {isLoading && <Loading />}

      {!isLoading && (!booking?.data || booking.data.length === 0) && (
        <p className="text-center text-gray-500 mt-10 text-xl">
          📌 No booking data available.
        </p>
      )}

      {booking?.data && booking.data.length > 0 && (
        <Table isStriped aria-label="My Bookings Table">
          <TableHeader>
            <TableColumn>Image</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Start Time</TableColumn>
            <TableColumn>End Time</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {booking.data.map((book: IBooking) => (
              <TableRow key={book.id}>
                <TableCell>
                  <Image
                    src={book.room.image || "/default-room.jpg"}
                    alt={book.room.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </TableCell>
                <TableCell>{book.room.name}</TableCell>
                <TableCell>{book.slots.date}</TableCell>
                <TableCell>{book.slots.startTime}</TableCell>
                <TableCell>{book.slots.endTime}</TableCell>
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
      )}
    </div>
  );
};

export default GetMyBooking;
