import React from "react";
import { auth, signIn, signOut } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className=""
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
};

const Header = async () => {
  const session = await auth();

  return (
    <header className="w-full flex justify-center py-8">
      <nav className="w-full max-w-[1050px]">
        <div className=" flex justify-end">
          {session?.user ? (
            <div className="flex items-center gap-4">
              {session.user.name} <SignOut />
            </div>
          ) : (
            <div className="">
              <Link href="/api/auth/signin">
                <Button>Sign In</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
