"use client";

import { useGetMeQuery } from "@/redux/feature/auth/authApi";
import { logout } from "@/redux/feature/auth/authSlice";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const NavberDropDown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMeQuery(undefined);
  const user = data?.data;
  console.log("user", user.profileImg);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogOut = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Image
          src={user?.profileImg}
          alt="profile"
          width={50}
          height={50}
          className="rounded-full border-2 cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Menu">
        {user?.role === "admin" ? (
          <DropdownItem
            key="dashboard"
            onClick={() => handleNavigation("/adminDashboard")}
          >
            Dashboard
          </DropdownItem>
        ) : (
          <DropdownItem
            key="mybookings"
            onClick={() => handleNavigation("/my-booking")}
          >
            My Bookings
          </DropdownItem>
        )}
        <DropdownItem key="logout" onClick={handleLogOut}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavberDropDown;
