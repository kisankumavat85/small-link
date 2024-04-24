"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as LinkIcon, PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
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

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="h-[calc(100vh_-_88px_-_16px_-_16px)] bg-background rounded-2xl p-4 border">
      <ul className=" ">
        {links.map((l) => {
          const active = pathname === l.path;
          return (
            <li key={l.name}>
              <Link
                href={l.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:text-white",
                  {
                    "text-white bg-secondary": active,
                  }
                )}
              >
                <l.icon className="h-4 w-4" />
                <span>{l.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;