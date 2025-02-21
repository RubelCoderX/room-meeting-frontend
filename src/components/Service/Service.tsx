import Image from "next/image";

const serviceData = [
  {
    headline: "Real-Time Availability",
    text: "View available rooms instantly.",
    icon: "https://i.ibb.co/N98H0TL/download.png",
  },
  {
    headline: "Instant Booking Confirmation",
    text: "Book now, get confirmed.",
    icon: "https://i.ibb.co/Sn8FxQP/download.png",
  },
  {
    headline: "Flexible Scheduling",
    text: "Schedule meetings at your pace.",
    icon: "https://i.ibb.co/TrDwRDM/images.png",
  },
  {
    headline: "24/7 Support",
    text: "Help is always available.",
    icon: "https://i.ibb.co/ZM217Wq/download.png",
  },
];

const Service = () => {
  return (
    <div className="mt-20">
      <h1 className="text-4xl text-center font-semibold text-[#4E7776]">
        Our Premium Services
      </h1>
      <div className="max-w-7xl mx-auto lg:bg-[#4E7776] lg:border md:border md:bg-[#4E7776] mt-10 py-[30px] rounded-md">
        <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center gap-10">
          {serviceData?.map((item, idx) => (
            <div
              key={idx}
              className="border text-zinc-900 p-3 rounded-md text-center w-52 h-36 hover:border-blue-500 hover:scale-110 duration-300 cursor-pointer flex items-center justify-center"
            >
              <div>
                <Image
                  width={50}
                  height={50}
                  className="w-12 h-12 object-cover mx-auto bg-blue-100 p-1 rounded-full"
                  src={item.icon}
                  alt=""
                />
                <h1 className="text-lg font-semibold text-white">
                  {item.headline}
                </h1>
                <p className="text-sm py-1 text-gray-300">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
