"use client";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/feature/auth/authApi";

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

const GetAllSlot = () => {
  const { data: user, isLoading } = useGetAllUsersQuery(undefined);

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
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
          <TableColumn>User Profile</TableColumn>
          <TableColumn>User Name</TableColumn>
          <TableColumn>User Role</TableColumn>
          <TableColumn>User Address</TableColumn>
          <TableColumn>User Email</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {user?.data?.map((user) => (
            <TableRow key={user?.id}>
              <TableCell>
                <Image
                  src={user?.profileImg || "/default-room.jpg"}
                  alt={user?.name}
                  width="50"
                  height="50"
                  className="rounded"
                />
              </TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>{user?.address}</TableCell>
              <TableCell>{user?.email}</TableCell>

              <TableCell>
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(user?.id)}
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
