"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const SignIn = () => {
  const handleClick = async () => {
    await signIn();
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Sign In
    </Button>
  );
};

export default SignIn;
