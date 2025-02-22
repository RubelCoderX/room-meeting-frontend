/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetAllRoomQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
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
import { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import uploadImageToCloudinary from "@/utils/uploadImage";
import { IoClose } from "react-icons/io5";

const roomFacilitiesOption = [
  { key: "wifi", value: "WiFi", label: "WiFi" },
  { key: "projector", value: "Projector", label: "Projector" },
  {
    key: "air-conditioning",
    value: "Air Conditioning",
    label: "Air Conditioning",
  },
  { key: "whiteboard", value: "Whiteboard", label: "Whiteboard" },
  {
    key: "video-conferencing",
    value: "Video Conferencing",
    label: "Video Conferencing",
  },
  { key: "parking", value: "Parking", label: "Parking" },
  { key: "refreshments", value: "Refreshments", label: "Refreshments" },
  { key: "sound-system", value: "Sound System", label: "Sound System" },
  { key: "tv", value: "Tv", label: "Tv" },
  { key: "swimming-pool", value: "Swimming pool", label: "Swimming pool" },
];

export type Room = {
  id: string;
  name: string;
  capacity: number;
  image?: string;
  amenities: string[];
};

interface FormData {
  name: string;
  capacity: number;
  amenities?: string[];
}

const GetAllRoom = () => {
  const { data: rooms, isLoading } = useGetAllRoomQuery([]);
  const [deleteRoom] = useDeleteRoomMutation();
  const [update] = useUpdateRoomMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<
    { value: string; label: string }[]
  >([]);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm<FormData>();

  useEffect(() => {
    if (selectedRoom) {
      setValue("name", selectedRoom.name || "");
      setValue("capacity", selectedRoom.capacity || 0);
      setSelectedAmenities(
        selectedRoom.amenities?.map((a: any) => ({ value: a, label: a })) || []
      );
    }
  }, [selectedRoom, setValue]);

  const handleImageChange = async (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("Please select an image.");
      return;
    }
    setImageUploadLoading(true);

    try {
      const files = await uploadImageToCloudinary(e.target.files);

      if (files && files.length > 0) {
        setProfileImage(files);
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error: any) {
      toast.error("Error uploading image: " + error.message);
    } finally {
      setImageUploadLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRoom(id).unwrap();
      toast.success("Room deleted successfully!");
    } catch (err: any) {
      toast.error(err?.error);
    }
  };

  const handleOpenUpdateModal = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleUpdateRoom = async (data: FormData) => {
    try {
      const updatedData = {
        name: data.name,
        image: profileImage || selectedRoom?.image || "",
        capacity: Number(data.capacity),
        amenities: selectedAmenities.map((item) => item.value),
      };
      console.log("updatedData", updatedData);
      const res = await update({
        roomId: selectedRoom?.id,
        ...updatedData,
      }).unwrap();
      if (res.error) {
        toast.error(res.error.data.message);
        return;
      } else {
        toast.success(res.message);
      }

      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to update room.");
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
          {rooms?.data?.map((room: Room) => (
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
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleOpenUpdateModal(room)}
                >
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Update Room</h2>
            <form onSubmit={handleSubmit(handleUpdateRoom)}>
              <input
                {...register("name")}
                placeholder="Room Name"
                className="border rounded-lg p-2 w-full mb-4"
              />
              <input
                {...register("capacity")}
                placeholder="Capacity"
                className="border rounded-lg p-2 w-full mb-4"
                type="number"
              />
              <div className="space-y-6">
                <div>
                  <Select
                    isMulti
                    options={roomFacilitiesOption}
                    value={selectedAmenities}
                    onChange={(newValue) =>
                      setSelectedAmenities(
                        newValue as { value: string; label: string }[]
                      )
                    }
                  />
                </div>

                <div className="mb-4 w-full">
                  <label
                    className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-gray-300 text-gray-500 shadow-sm transition-all duration-100 hover:border-gray-500"
                    htmlFor="image"
                  >
                    Upload Image
                  </label>
                  <input
                    className="hidden"
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={imageUploadLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
              >
                Update Room
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllRoom;
