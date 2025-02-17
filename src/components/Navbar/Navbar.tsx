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

export default function App() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
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

        {/* Menu items aligned to the right */}
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarItem>
            <Link className="text-[#4E7776]" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-[#4E7776]" href="/meeting">
              Meeting Room
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-[#4E7776]" href="/about">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-[#4E7776]" href="/contact">
              Contact Us
            </Link>
          </NavbarItem>
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
        </NavbarContent>

        {/* Mobile menu toggle */}
        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile menu dropdown */}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </div>
    </Navbar>
  );
}
