"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import Image from "next/image";
import logo from "../../assets/Logo 1.png";
import { useAppSelector, useAppDispatch } from "@/redux/hook";

import { useEffect, useState } from "react";
import Loading from "@/utils/loading";
import { logout } from "@/redux/feature/auth/authSlice";

const NavigationBar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const userMenuItems = [
    { name: "Meeting", path: "/meeting" },
    { name: "My Booking", path: "/my-booking" },
  ];

  const adminMenuItems = [
    { name: "Create Room", path: "/create-room" },
    { name: "Total Room", path: "/get-all-room" },
    { name: "Create Slot", path: "/create-slot" },
    { name: "Total Slot", path: "/get-slot" },
  ];

  return (
    <Navbar disableAnimation isBordered>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <NavbarContent justify="start">
          <NavbarBrand>
            <Link href="/">
              <Image src={logo} width={100} height={100} alt="logo" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Menu items (Always visible) */}
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          {/* <NavbarItem>
            <Link className="text-[#4E7776]" href="/">
              Home
            </Link>
          </NavbarItem> */}

          {/* Conditionally render user-related links only after hydration */}
          {isClient ? (
            user ? (
              <>
                {(user.role === "ADMIN" ? adminMenuItems : userMenuItems).map(
                  (item, index) => (
                    <NavbarItem key={index}>
                      <Link className="text-[#4E7776]" href={item.path}>
                        {item.name}
                      </Link>
                    </NavbarItem>
                  )
                )}
                {/* Logout Button */}
                <NavbarItem>
                  <Button
                    className="bg-red-600 text-white font-semibold"
                    variant="bordered"
                    radius="none"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </NavbarItem>
              </>
            ) : (
              <NavbarItem>
                <Button
                  className="bg-[#4E7776] text-white font-semibold"
                  variant="bordered"
                  radius="none"
                >
                  <Link className="text-white" href="/login">
                    Login
                  </Link>
                </Button>
              </NavbarItem>
            )
          ) : (
            <NavbarItem>
              <Loading />
            </NavbarItem>
          )}
        </NavbarContent>

        {/* Mobile menu toggle */}
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile menu dropdown */}
        <NavbarMenu>
          {isClient ? (
            user ? (
              (user.role === "ADMIN" ? adminMenuItems : userMenuItems).map(
                (item, index) => (
                  <NavbarMenuItem key={index}>
                    <Link href={item.path} className="w-full text-[#4E7776]">
                      {item.name}
                    </Link>
                  </NavbarMenuItem>
                )
              )
            ) : (
              <NavbarMenuItem>
                <Link href="/login" className="w-full text-[#4E7776]">
                  Login
                </Link>
              </NavbarMenuItem>
            )
          ) : (
            <NavbarMenuItem>
              <Loading />
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
