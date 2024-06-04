import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { getServerSession } from "next-auth";

import { getInitials } from "@/utils";
import Avatar from "./shared/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { authOptions } from "@/lib/auth";
import SignOut from "./shared/sign-out";
import SignIn from "./shared/sign-in";
import { navLinks } from "@/constants";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="fluid-container">
      <div className="flex justify-center py-4 md:mt-4">
        <nav className="w-full flex justify-between items-center">
          <Link href="/" className="md:text-3xl text-2xl font-sansBungee">
            SL
          </Link>
          <div className="flex justify-end">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar
                    image={session.user.image || ""}
                    fallback={getInitials(session.user.name!)}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {navLinks.map((link) => (
                    <DropdownMenuGroup key={link.name}>
                      <Link
                        href={link.path}
                        prefetch
                        className="cursor-pointer"
                      >
                        <DropdownMenuItem>
                          <link.icon className="mr-2 h-4 w-4" />
                          <span>{link.name}</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/api/auth/signout" className="cursor-pointer">
                      <DropdownMenuItem className="text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        <SignOut />
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="">
                {/* <Link href="/api/auth/signin"> */}
                <SignIn />
                {/* </Link> */}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
