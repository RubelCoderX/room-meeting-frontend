// import { Spinner } from "@heroui/spinner";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md">
      <FaSpinner fontSize={"3rem"} className="animate-spin" />
    </div>
  );
};

export default Loading;
{
  /* <div className="flex justify-center items-center h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md">
      <Spinner size="lg" />
    </div> */
}
