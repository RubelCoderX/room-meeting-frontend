"use client";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@heroui/button";
import TechForm from "@/components/form/TechForm/TechForm";
import TechSelect from "@/components/form/TechSelect/TechSelect";
import { TechInput } from "@/components/form/TechInput/TechInput";
import { useCreateRoomMutation } from "@/redux/feature/meeting/meetingApi";
import uploadImageToCloudinary from "@/utils/uploadImage";

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

const CreateRoom: React.FC = () => {
  const [addRoom] = useCreateRoomMutation();
  const [profileImage, setProfileImage] = useState<string>("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
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

  // ✅ Form Submission Handler
  const handleCreateRoom = async (data: FieldValues) => {
    console.log(profileImage);
    const formData = {
      ...data,
      capacity: Number(data.capacity),
      image: profileImage,
    };
    console.log(formData);

    try {
      const res = await addRoom(formData);
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="lg:w-[500px] md:w-[500px] w-full text-center lg:mx-auto md:mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Room</h2>
      <TechForm onSubmit={handleCreateRoom}>
        <div className="flex flex-col gap-4">
          <TechInput type="text" name="name" label="Room Name" radius="none" />
          <TechInput
            type="number"
            name="capacity"
            label="Capacity"
            radius="none"
          />
          <TechSelect
            options={roomFacilitiesOption}
            name="amenities"
            label="Amenities"
            isMulti
            radius="lg"
          />

          {/* ✅ Image Upload Section */}
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
          className="w-56 mx-auto h-9 mt-4"
          type="submit"
          disabled={imageUploadLoading}
        >
          Create Room
        </Button>
      </TechForm>
    </div>
  );
};

export default CreateRoom;
