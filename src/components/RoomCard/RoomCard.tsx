import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {
  return (
    <div>
      <Card className="shadow-lg bg-[#D9D9D9]">
        <div className="">
          <Image
            width={260}
            height={150}
            alt="Meeting Room"
            src={room?.image}
            className="w-full h-[159px] object-cover  p-4"
          />
        </div>
        <CardBody className="p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold">{room?.name}</h3>
            <p className="text-gray-600 flex items-center gap-1"></p>
            <p className="font-bold text-gray-700">
              Capacity : {room?.capacity} People
            </p>
          </div>
          <Link href={`/${room.id}`}>
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
    </div>
  );
};

export default RoomCard;
