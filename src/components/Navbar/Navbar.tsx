"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import Link from "next/link";
import NavberDropDown from "./NavberDropDown";
import Image from "next/image";
import logo from "../../assets/Logo 1.png";
import { siteConfig } from "@/utils/siteConfig";
import { useGetMeQuery } from "@/redux/feature/auth/authApi";

export const Navber = () => {
  const { data } = useGetMeQuery(undefined);
  const user = data?.data;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar className="border-b-1" maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link
            className="flex items-center gap-1 light:text-[#F9F9F9]"
            href="/"
          >
            <Image src={logo} alt="Gadget Guru Hub" width={100} height={100} />
          </Link>
        </NavbarBrand>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-4 ml-2  font-bold">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className="hover:text-[#4E7776] transition-colors"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Desktop User Options */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {user?.email ? (
          <NavbarItem className="hidden md:flex">
            <NavberDropDown />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden md:flex">
            <Link
              className="border px-6 rounded py-2 text-white bg-[#4E7776]"
              href="/login"
            >
              Log In
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarMenuToggle
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden"
      />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <NavbarMenu className="absolute top-16 left-0 w-full bg-white shadow-md">
          {siteConfig.navItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {/* Mobile User Options */}
          <NavbarMenuItem>
            {user?.email ? (
              <NavberDropDown />
            ) : (
              <Link
                className="block px-4 py-2 text-white bg-[#4E7776] border-t"
                href="/login"
              >
                Log In
              </Link>
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      )}
    </Navbar>
  );
};
