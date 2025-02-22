/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input, Select, SelectItem, Button } from "@heroui/react";
import { useCallback, useState } from "react";

import RoomCard from "@/components/RoomCard/RoomCard";
import Loading from "@/utils/loading";
import { useGetAllRoomQuery } from "@/redux/feature/room/roomApi";
import { debounce } from "lodash";
export type Room = {
  id: string;
  name: string;
  capacity: number;
  image: string;
  amenities: string[];
};
const Room = () => {
  const [capacity, setCapacity] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isFetching } = useGetAllRoomQuery({ searchTerm, capacity });

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 500),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Clear filters (reset state)
  const clearFilters = () => {
    setCapacity("");
    setSearchTerm("");
    debouncedSearch("");
  };

  if (isFetching) return <Loading />;

  // Capacity options (1-50 people)
  const capacityOptions = Array.from({ length: 50 }, (_, i) => ({
    key: (i + 1).toString(),
    label: `${i + 1} People`,
  }));

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-4 md:p-6 min-h-[80vh] gap-6">
      {/* Left Sidebar (Filters) */}
      <div className="w-full md:w-[296px] bg-[#DFD3D1] p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Filter by Location:</h2>

        {/* Search Input */}
        <div className="flex flex-col space-y-2 mb-6">
          <Input
            type="search"
            onChange={handleSearch}
            placeholder="Search by room name or keyword"
            className="h-12"
          />
        </div>

        {/* Capacity Filter */}
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
              <SelectItem key={option.key} id={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-6">
          <Button
            onClick={clearFilters}
            variant="bordered"
            className="w-full bg-[#4E7776] text-white"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Right Side (Rooms Display) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.length > 0 ? (
          data?.data?.map((room: Room) => (
            <RoomCard key={room.id} room={room} />
          ))
        ) : (
          <p className="col-span-3 text-center">No rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default Room;
