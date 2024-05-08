import { NextRequest } from "next/server";
import Bowser from "bowser";

import { prisma } from "@/lib/prisma";
import { getGeoLocationFromIP } from "@/server-actions/geo-location";

const workerUrl = process.env.WORKER_URL;
const apiKey = process.env.API_KEY!;

type Params = { params: { slug: string } };

export const GET = async (
  request: NextRequest,
  { params: { slug } }: Params
) => {
  const { origin } = new URL(request.url);

  if (!slug) {
    return new Response(null, {
      headers: { Location: origin },
      status: 302,
    });
  }

  try {
    const res = await fetch(`${workerUrl!}/api/link/${slug}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    });

    const resData = (await res.json()) as {
      success: string;
      originalUrl: string;
      slug: string;
    };

    if (!resData.originalUrl) {
      return new Response(null, {
        headers: { Location: origin },
        status: 302,
      });
    }

    let shortLink;

    shortLink = await prisma.shortURL.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!shortLink?.id) {
      return new Response(null, {
        headers: { Location: resData.originalUrl },
        status: 302,
      });
    }

    const userAgent = request.headers.get("User-Agent");
    const { os, browser, platform } = Bowser.parse(userAgent || "");

    let geoLocation = await getGeoLocationFromIP();

    const analytics: any = {
      os: os.name,
      browser: browser.name === "Microsoft Edge" ? "Edge" : browser.name,
      deviceType: platform.type,
    };

    if (geoLocation) {
      analytics.country = geoLocation.country;
      analytics.region = geoLocation.region;
      analytics.city = geoLocation.city;
    }

    await prisma.click.create({
      data: {
        ...analytics,
        shortUrlId: shortLink.id,
      },
    });

    return new Response(null, {
      headers: { Location: resData.originalUrl },
      status: 302,
    });
  } catch (error) {
    return new Response(null, {
      headers: { Location: origin },
      status: 302,
    });
  }
};
