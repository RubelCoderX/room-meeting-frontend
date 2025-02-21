import { Button } from "@heroui/button";
import Image from "next/image";
import React from "react";
import Booking from "../../assets/booking1.png";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className=" max-w-7xl mx-auto  flex flex-col lg:flex-row items-center justify-between  px-8 py-12">
      {/* Left Content */}
      <div className="max-w-sm text-center lg:text-left">
        <h2 className="text-3xl lg:text-4xl font-semibold text-[#4E7776]">
          Make your space work for your team
        </h2>
        <Link href="/meeting">
          <Button
            radius="none"
            variant="bordered"
            className="mt-6 px-6 py-3 bg-[#4E7776] text-white font-semibold"
          >
            Book Now
          </Button>
        </Link>
      </div>

      {/* Right Image */}
      <div className="mt-8 lg:mt-0">
        <Image
          src={Booking}
          width={465}
          height={289}
          alt="booking"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
