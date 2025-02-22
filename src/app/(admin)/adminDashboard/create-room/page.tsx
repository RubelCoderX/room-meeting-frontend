/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { ChangeEvent, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@heroui/button";
import TechForm from "@/components/form/TechForm/TechForm";
import Select from "react-select";
import { TechInput } from "@/components/form/TechInput/TechInput";

import uploadImageToCloudinary from "@/utils/uploadImage";
import { useCreateRoomMutation } from "@/redux/feature/room/roomApi";
const roomFacilitiesOption = [
  { value: "WiFi", label: "WiFi" },
  { value: "Projector", label: "Projector" },
  { value: "Air Conditioning", label: "Air Conditioning" },
  { value: "Whiteboard", label: "Whiteboard" },
  { value: "Video Conferencing", label: "Video Conferencing" },
  { value: "Parking", label: "Parking" },
  { value: "Refreshments", label: "Refreshments" },
  { value: "Sound System", label: "Sound System" },
  { value: "Tv", label: "Tv" },
  { value: "Swimming pool", label: "Swimming pool" },
];

const CreateRoom: React.FC = () => {
  const [addRoom] = useCreateRoomMutation();
  const [profileImage, setProfileImage] = useState<string>("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<
    { value: string; label: string }[]
  >([]);
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

  //Form Submission Handler
  const handleCreateRoom = async (data: FieldValues) => {
    const formData = {
      ...data,
      capacity: Number(data.capacity),
      image: profileImage,
      amenities: selectedAmenities.map((item) => item?.value),
    };

    try {
      const res: any = await addRoom(formData);

      if (res.error) {
        toast.error(res?.data?.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center p-28">
      <div className=" max-w-7xl w-full mx-auto border p-10  rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create Room</h2>
        <TechForm onSubmit={handleCreateRoom}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TechInput
                type="text"
                name="name"
                label="Room Name"
                radius="none"
              />
              <TechInput
                type="number"
                name="capacity"
                label="Capacity"
                radius="none"
              />
            </div>
            <div>
              <label className="block mb-2">Select Amenities:</label>
              <Select
                isMulti
                options={roomFacilitiesOption}
                value={selectedAmenities}
                onChange={(selected) =>
                  setSelectedAmenities(selected as typeof roomFacilitiesOption)
                }
              />
            </div>

            {/* Image Upload Section */}
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

          <Button
            className="w-full py-2 text-white mt-4 cursor-pointer bg-[#4E7776] font-semibold"
            type="submit"
            disabled={imageUploadLoading}
          >
            Create Room
          </Button>
        </TechForm>
      </div>
    </div>
  );
};

export default CreateRoom;
