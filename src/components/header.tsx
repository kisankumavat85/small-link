import React from "react";
import Link from "next/link";
import { LogOut, PanelsTopLeft } from "lucide-react";

import { auth, signOut } from "@/auth";
import { getInitials } from "@/utils";
import Avatar from "./shared/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
};

const Header = async () => {
  const session = await auth();

  return (
    <header className="fluid-container">
      <div className="flex justify-center py-4 md:mt-4">
        <nav className="w-full flex justify-between items-center">
          <Link href="/" className="md:text-3xl text-2xl font-sansBungee">
            YSL
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
                  <DropdownMenuGroup>
                    <Link href="/dashboard" prefetch className="cursor-pointer">
                      <DropdownMenuItem>
                        <PanelsTopLeft className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
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
                <Link href="/api/auth/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
