"use client";
import { useGetRoomByIdQuery } from "@/redux/feature/meeting/meetingApi";
import Loading from "@/utils/loading";
import { Armchair, Computer, Tv, Wifi } from "lucide-react";
import Image from "next/image";
const facilityIcons: Record<string, JSX.Element> = {
  WiFi: <Wifi />,
  Projector: <Tv />,
  Whiteboard: <Computer />,
};
const RoomDetailsPage = ({ params: { roomId } }) => {
  const { data, isFetching } = useGetRoomByIdQuery(roomId);
  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center p-20">
      <div className="p-6 rounded-lg flex flex-wrap md:flex-nowrap max-w-4xl w-full gap-6">
        {/* Left Side - Image */}
        <div className="w-full md:w-[50%] border h-72 md:h-[300px]">
          <Image
            src={data?.data?.image}
            alt="Conference Room"
            width={500}
            height={200}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-[50%] p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold">{data?.data?.name}</h2>
          <p className="text-gray-600 text-sm md:text-base">
            Total Capacity: {data?.data?.capacity} People
          </p>

          <h3 className="font-semibold mt-4 text-sm md:text-base">
            Room Facility :
          </h3>
          <div className="flex flex-wrap md:flex-nowrap gap-4 mt-2">
            {data?.data?.amenities?.map((facility, index) => (
              <FacilityItem
                key={index}
                icon={facilityIcons[facility] || <Armchair />}
                label={facility}
              />
            ))}
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
