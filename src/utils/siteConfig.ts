export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Meeting Room",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Meeting Rooms",
      href: "/meeting",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
    {
      label: "About Us",
      href: "/about",
    },
  ],
};
