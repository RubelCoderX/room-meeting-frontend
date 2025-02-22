import Booking from "@/components/Booking/Booking";

interface PageProps {
  params: {
    roomId: string;
  };
}

const Page = ({ params: { roomId } }: PageProps) => {
  return (
    <div>
      <Booking id={roomId} />
    </div>
  );
};

export default Page;
