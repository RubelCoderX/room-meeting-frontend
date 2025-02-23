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
import { useState } from "react";
import { toast } from "sonner";

type IBooking = {
  id: string;
  title: string;
  description: string;
  room: {
    name: string;
    image: string;
    amenities: string[];
  };
  slots: {
    date: string;
    startTime: string;
    endTime: string;
  };
};

const GetMyBooking = () => {
  const [page, setPage] = useState(1);
  const limit = 1; // Number of bookings per page

  const { data: booking, isLoading } = useGetMyBookingQuery({ page, limit });
  console.log("booking", booking);
  const [deleteBooking] = useDeleteBookingMutation();

  const totalPages = Math.ceil((booking?.data?.meta?.total || 1) / limit);

  // Handle booking deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id).unwrap();
      toast.success("Booking deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete booking.");
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="p-6 pt-10 container mx-auto min-h-[80vh]">
      {isLoading && <Loading />}

      {!isLoading &&
        (!booking?.data?.data || booking.data.data.length === 0) && (
          <p className="text-center text-gray-500 mt-10 text-xl">
            📌 No booking data available.
          </p>
        )}

      {booking?.data?.data && booking.data.data.length > 0 && (
        <>
          <Table isStriped aria-label="My Bookings Table">
            <TableHeader>
              <TableColumn>Image</TableColumn>
              <TableColumn>Title</TableColumn>
              <TableColumn>Room Name</TableColumn>
              <TableColumn>Amenities</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Start Time</TableColumn>
              <TableColumn>End Time</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              {booking.data.data.map((book: IBooking) => (
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
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.room.name}</TableCell>
                  <TableCell>{book.room.amenities.join(", ")}</TableCell>
                  <TableCell>{book.slots.date}</TableCell>
                  <TableCell>{book.slots.startTime}</TableCell>
                  <TableCell>{book.slots.endTime}</TableCell>
                  <TableCell>
                    {/* <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                      Update
                    </button> */}
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

          {/* Custom Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={page <= 1}
              className={`px-4 py-2 rounded ${
                page <= 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-3 py-1 rounded ${
                      page === pageNumber
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={page >= totalPages}
              className={`px-4 py-2 rounded ${
                page >= totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GetMyBooking;
