import { LinkIcon, PanelsTopLeft } from "lucide-react";

export const weekDays: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thr",
  5: "Fri",
  6: "Sat",
};

export const navLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: PanelsTopLeft,
  },
  {
    name: "Links",
    path: "/dashboard/links",
    icon: LinkIcon,
  },
];
