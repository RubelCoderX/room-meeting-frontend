import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col  min-h-screen bg-[#FFF2F1]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
