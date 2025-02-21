"use client";

import { Input, Select, SelectItem } from "@heroui/react";

import { useState } from "react";

import RoomCard from "@/components/RoomCard/RoomCard";
import Loading from "@/utils/loading";
import { useGetAllRoomQuery } from "@/redux/feature/room/roomApi";

const Room = () => {
  const { data, isFetching } = useGetAllRoomQuery(undefined);

  const [capacity, setCapacity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  if (isFetching) {
    return <Loading />;
  }
  const capacityOptions = Array.from({ length: 50 }, (_, i) => ({
    key: (i + 1).toString(),
    label: `${i + 1} People`,
  }));

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-4 md:p-6 my-10 gap-6">
      {/* Left Sidebar (Filters) */}
      <div className="w-full md:w-[296px] bg-[#DFD3D1] p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Filter by Location:</h2>
        <div className="flex flex-col space-y-2 mb-6">
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by room name or keyword"
            className="h-12"
          />
        </div>

        <div className="pt-4">
          <p className="text-sm font-semibold mb-2">
            Filter with capacity ({capacity || "Select"} people)
          </p>
          <Select
            className="w-full"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
            placeholder="Select People Capacity"
          >
            {capacityOptions.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Right Side (Rooms) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};
export default Room;
