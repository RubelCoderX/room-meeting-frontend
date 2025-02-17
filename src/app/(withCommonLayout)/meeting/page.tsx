"use client";

import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Card, CardBody } from "@heroui/card";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RoomFilter() {
  const [capacity, setCapacity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const capacityOptions = Array.from({ length: 50 }, (_, i) => ({
    key: (i + 1).toString(),
    label: `${i + 1} People`,
  }));

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-4 md:p-6 gap-6">
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
        {[1, 2, 3, 4, 5, 6].map((room, index) => (
          <Card key={index} className="shadow-lg bg-[#D9D9D9]">
            <div className="p-4">
              <Image
                width={260}
                height={150}
                alt="Meeting Room"
                src="/room-image.jpg"
                className="w-full h-[159px] object-cover border p-4"
              />
            </div>
            <CardBody className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">Austin</h3>
                <p className="text-gray-600 flex items-center gap-1">
                  📍 Dev Bay, Chennai
                </p>
                <p className="font-bold text-gray-700">Max Limit: 20-24</p>
              </div>
              <Link href={`/${room}`}>
                <Button
                  variant="bordered"
                  radius="none"
                  className="w-full bg-[#4E7776] mt-4 text-white hover:bg-[#3a5d5d] transition"
                >
                  Booking
                </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
