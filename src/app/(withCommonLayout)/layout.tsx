import Footer from "@/components/Footer/Footer";
import { Navber } from "@/components/Navbar/Navbar";

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col  min-h-screen bg-[#FFF2F1]">
      <Navber />
      {children}
      <hr />
      <Footer />
    </div>
  );
};

export default Layout;
