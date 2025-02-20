"use client";
import { useState, useRef, useEffect } from "react";
import { FaAngleUp, FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const AdminSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const roomManagementRef = useRef<HTMLDivElement>(null);
  const slotManagementRef = useRef<HTMLDivElement>(null);
  const bookManagementRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const getHeight = (ref: React.RefObject<HTMLDivElement>) => {
    return ref.current ? `${ref.current.scrollHeight}px` : "0px";
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-16 left-4 z-50 p-2 bg-blue-600 text-white rounded-full"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-64 pt-8 bg-gray-100 p-4 transition-transform duration-300 md:relative md:translate-x-0 md:w-64 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-3">
          {/* Home Link */}
          <Link
            href="/"
            className="block text-blue-600 px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 transition"
          >
            Home
          </Link>

          {/* Room Management */}
          <div>
            <button
              onClick={() => toggleDropdown("roomManagement")}
              className="w-full flex items-center gap-1 text-left border text-blue-600 px-3 py-2 rounded-md text-base font-medium focus:outline-none"
            >
              {openDropdown === "roomManagement" ? (
                <FaAngleUp />
              ) : (
                <FaAngleDown />
              )}
              Room Management
            </button>
            <div
              ref={roomManagementRef}
              style={{
                height:
                  openDropdown === "roomManagement"
                    ? getHeight(roomManagementRef)
                    : "0px",
              }}
              className="overflow-hidden transition-all duration-300"
            >
              <div className="pl-4 space-y-2">
                <Link
                  href="/adminDashboard/create-room"
                  className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
                >
                  Create Room
                </Link>
                <Link
                  href="/adminDashboard/get-all-room"
                  className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
                >
                  Get All Rooms
                </Link>
              </div>
            </div>
          </div>

          {/* Slot Management */}
          <div>
            <button
              onClick={() => toggleDropdown("slotManagement")}
              className="w-full flex items-center gap-1 text-left border text-blue-600 px-3 py-2 rounded-md text-base font-medium focus:outline-none"
            >
              {openDropdown === "slotManagement" ? (
                <FaAngleUp />
              ) : (
                <FaAngleDown />
              )}
              Slot Management
            </button>
            <div
              ref={slotManagementRef}
              style={{
                height:
                  openDropdown === "slotManagement"
                    ? getHeight(slotManagementRef)
                    : "0px",
              }}
              className="overflow-hidden transition-all duration-300"
            >
              <div className="pl-4 space-y-2">
                <Link
                  href="/adminDashboard/create-slot"
                  className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
                >
                  Create Slot
                </Link>
                <Link
                  href="/adminDashboard/get-all-slot"
                  className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
                >
                  Get All Slots
                </Link>
              </div>
            </div>
          </div>

          {/* Book Management */}
          <div>
            <button
              onClick={() => toggleDropdown("bookManagement")}
              className="w-full flex items-center gap-1 text-left border text-blue-600 px-3 py-2 rounded-md text-base font-medium focus:outline-none"
            >
              {openDropdown === "bookManagement" ? (
                <FaAngleUp />
              ) : (
                <FaAngleDown />
              )}
              Book Management
            </button>
            <div
              ref={bookManagementRef}
              style={{
                height:
                  openDropdown === "bookManagement"
                    ? getHeight(bookManagementRef)
                    : "0px",
              }}
              className="overflow-hidden transition-all duration-300"
            >
              <div className="pl-4 space-y-2">
                <Link
                  href="/adminDashboard/bookings"
                  className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
                >
                  All Bookings
                </Link>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div>
            <button
              onClick={() => toggleDropdown("userManagement")}
              className="w-full flex items-center gap-1 text-left border text-blue-600 px-3 py-2 rounded-md text-base font-medium focus:outline-none"
            >
              {openDropdown === "userManagement" ? (
                <FaAngleUp />
              ) : (
                <FaAngleDown />
              )}
              User Management
            </button>
            <div
              ref={bookManagementRef}
              style={{
                height:
                  openDropdown === "userManagement"
                    ? getHeight(bookManagementRef)
                    : "0px",
              }}
              className="overflow-hidden transition-all duration-300"
            >
              <div className="pl-4 space-y-2">
                <Link
                  href="/adminDashboard/allUser"
                  className="block text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
                >
                  All Users
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
