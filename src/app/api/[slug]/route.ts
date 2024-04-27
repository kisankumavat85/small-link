import { prisma } from "@/lib/prisma";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";
import Bowser from "bowser";
import { getGeoLocationFromIP } from "@/server-actions/geo-location";

export const runtime = "edge";

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
    const kv = getRequestContext().env.SL_KV;
    const link = await kv.get(slug);

    if (!link) {
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
        headers: { Location: link },
        status: 302,
      });
    }

    const userAgent = request.headers.get("User-Agent");
    const { os, browser, platform } = Bowser.parse(userAgent || "");

    let ipData = await getGeoLocationFromIP();

    const data: any = {
      os: os.name,
      browser: browser.name === "Microsoft Edge" ? "Edge" : browser.name,
      deviceType: platform.type,
    };

    if (ipData) {
      data.country = ipData.country;
      data.region = ipData.region;
      data.city = ipData.city;
    }

    await prisma.click.create({
      data: {
        ...data,
        shortUrlId: shortLink.id,
      },
    });

    return new Response(null, {
      headers: { Location: link },
      status: 302,
    });
  } catch (error) {
    return new Response(null, {
      headers: { Location: origin },
      status: 302,
    });
  }
};
