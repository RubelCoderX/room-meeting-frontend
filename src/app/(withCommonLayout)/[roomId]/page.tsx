"use client";
import { Armchair, Computer, Tv, Wifi } from "lucide-react";
import Image from "next/image";

const RoomDetailsPage = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="p-6 rounded-lg flex flex-wrap md:flex-nowrap max-w-4xl w-full gap-6">
        {/* Left Side - Image */}
        <div className="w-full md:w-[50%] border h-64 md:h-[380px]">
          <Image
            src="/image.png"
            alt="Conference Room"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-[50%] p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold">Austin</h2>
          <p className="text-gray-600 text-sm md:text-base">Dev, Chennai</p>

          <h3 className="font-semibold mt-4 text-sm md:text-base">
            Room Facility :
          </h3>
          <div className="flex flex-wrap md:flex-nowrap gap-4 mt-2">
            <FacilityItem icon={<Wifi />} label="Sirius Guest" />
            <FacilityItem icon={<Armchair />} label="20-23" />
            <FacilityItem icon={<Computer />} label="Yes" />
            <FacilityItem icon={<Tv />} label="No" />
          </div>

          <button className="mt-6 bg-[#4E7776] text-white py-2 px-4 rounded-md w-full hover:bg-gray-800 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;

const FacilityItem = ({
  icon,
  label,
}: {
  icon: JSX.Element;
  label: string;
}) => (
  <div className="flex flex-col items-center">
    <div className="bg-gray-200 p-3 rounded-full">{icon}</div>
    <p className="text-xs md:text-sm text-gray-600 mt-1">{label}</p>
  </div>
);
