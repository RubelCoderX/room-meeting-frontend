/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetMeQuery } from "@/redux/feature/auth/authApi";
import { useGetRoomByIdQuery } from "@/redux/feature/room/roomApi";
import Loading from "@/utils/loading";
import { Armchair, Computer, Tv, Wifi } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const facilityIcons: Record<string, JSX.Element> = {
  WiFi: <Wifi />,
  Projector: <Tv />,
  Whiteboard: <Computer />,
};
interface PageProps {
  params: {
    roomId: string;
  };
}

const RoomDetailsPage = ({ params: { roomId } }: PageProps) => {
  const { data, isFetching } = useGetRoomByIdQuery(roomId);
  const { data: user } = useGetMeQuery(undefined);
  const userProfile = user?.data;
  const router = useRouter();

  if (isFetching) {
    return <Loading />;
  }

  const handleBookingClick = () => {
    if (userProfile) {
      router.push(`/${roomId}/booking`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] px-4">
      <div className="max-w-7xl w-full mx-auto p-6 rounded-lg flex flex-wrap md:flex-nowrap gap-6">
        {/* Left Side - Image */}
        <div className="w-full md:w-[60%] border h-72 md:h-[400px]">
          <Image
            src={data?.data?.image}
            alt="Conference Room"
            width={700}
            height={400}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-[40%] p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold">{data?.data?.name}</h2>
          <p className="text-gray-600 text-sm md:text-base">
            Total Capacity: {data?.data?.capacity} People
          </p>

          <h3 className="font-semibold mt-4 text-sm md:text-base">
            Room Facilities:
          </h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {data?.data?.amenities?.map((facility: any, index: any) => (
              <FacilityItem
                key={index}
                icon={facilityIcons[facility] || <Armchair />}
                label={facility}
              />
            ))}
          </div>

          <button
            onClick={handleBookingClick}
            className="mt-6 bg-[#4E7776] text-white py-2 px-4 rounded-md w-full hover:bg-gray-800 transition"
          >
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
