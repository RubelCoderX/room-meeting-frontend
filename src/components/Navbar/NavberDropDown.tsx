"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
// import { usePathname, useRouter } from "next/navigation";

const NavberDropDown = () => {
  const router = useRouter();
  // const { user, isSetLoading: UserLoading } = useUser();

  // const pathname = usePathname();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  // const handleLogOut = () => {
  //   logOut();
  //   UserLoading(true);
  //   if (protectedRoutes.some((route) => pathname.match(route))) {
  //     router.push("/");
  //   }
  // };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.profileImage} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions">
        <DropdownItem
          key="dashboard"
          onClick={() => handleNavigation(`/${user?.role}Dashboard`)}
        >
          Dashboard
        </DropdownItem>

        <DropdownItem key="logout" onClick={() => handleLogOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavberDropDown;
