"use server";

import { headers } from "next/headers";

export const getIP = () => {
  const forwardedFor = headers().get("x-forwarded-for");
  const realIP = headers().get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) {
    return realIP.trim();
  }

  return null;
};
