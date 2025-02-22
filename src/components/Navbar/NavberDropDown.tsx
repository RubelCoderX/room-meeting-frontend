"use client";

import { baseApi } from "@/redux/api/baseApi";
import { useGetMeQuery } from "@/redux/feature/auth/authApi";
import { logout } from "@/redux/feature/auth/authSlice";
import { removeToken } from "@/utils/seetCookie";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const NavberDropDown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useGetMeQuery(undefined);
  const user = data?.data;
  // console.log("user", user);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    refetch();
  }, [refetch]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogOut = async () => {
    removeToken();
    dispatch(logout());
    // await refetch();
    dispatch(baseApi.util.resetApiState());
    router.push("/login");
  };

  if (isLoading) return <div>Loading...</div>;
  if (!isMounted) {
    return null;
  }

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
