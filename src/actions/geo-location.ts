"use server";

import { getIP } from "./ip";

interface GeoLocationData {
  query: string;
  status: "success" | "fail";
  region: string;
  country: string;
  city: string;
  countryCode: string;
}

export const getGeoLocationFromIP = async () => {
  try {
    const res = await fetch(
      `http://ip-api.com/json/${getIP()}?fields=status,country,city,region,query`
    );
    const data = (await res.json()) as GeoLocationData;
    if (data.status === "success") {
      return data;
    }
    return null;
  } catch (error) {}
};
