import Navbar from "@/components/Navbar/Navbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
