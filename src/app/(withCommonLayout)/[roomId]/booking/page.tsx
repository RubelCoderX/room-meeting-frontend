import Booking from "@/components/Booking/Booking";

const Page = ({ params: { roomId } }) => {
  return (
    <div>
      <Booking id={roomId} />
    </div>
  );
};

export default Page;
