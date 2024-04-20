import { prisma } from "@/lib/prisma";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";
import Bowser from "bowser";
// import { Analytics } from "@prisma/client";
import { auth } from "@/auth";
import { getGeoLocationFromIP } from "@/server-actions/geo-location";
import { UAParser } from "ua-parser-js";

export const runtime = "edge";

type Params = { params: { slug: string } };

type NewAnalytics = {
  os?: string;
  browser?: string;
  country?: string;
};

// type NewAnalytics = Partial<
//   Omit<Analytics, "id" | "linkId" | "clicks" | "createdAt" | "modifiedAt">
// >;

const mergeData = (
  obj1: any,
  obj2: any
  // obj1: Pick<Analytics, "browser" | "clicks" | "country" | "os"> | null,
  // obj2: NewAnalytics
) => {
  const ignoreKeys = ["id", "linkId", "createdAt", "modifiedAt"];
  const initialData = {
    browser: {},
    os: {},
    country: {},
    clicks: 1,
    ...obj1,
  };

  if (!obj1) {
    for (const key in obj2) {
      initialData[key][obj2[key]] = 1;
    }
    return initialData;
  }

  for (const key in initialData) {
    if (!ignoreKeys.includes(key)) {
      if (typeof initialData[key] === "object" && initialData[key]) {
        if (Object.keys(initialData[key]).length > 0) {
          for (const k2 in obj2) {
            if (k2 === key) {
              initialData[key][obj2[k2]] = initialData[key][obj2[k2]]
                ? initialData[key][obj2[k2]] + 1
                : 1;
            }
          }
        }
      } else {
        // For clicks increment
        initialData[key] = initialData[key] ? initialData[key] + 1 : 1;
      }
    }
  }

  return initialData;
};

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

  const session = await auth();

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
      browser: browser.name,
      deviceType: platform.type,
    };

    if (ipData) {
      data.country = ipData.country;
      data.region = ipData.region;
      data.city = ipData.city;
    }

    console.log("data", data);

    const aa = await prisma.click.create({
      data: {
        ...data,
        shortUrlId: shortLink.id,
      },
    });

    console.log("aa", aa);

    // const mergedData = mergeData(prevAnalytics, data);

    // if (prevAnalytics) {
    //   await prisma.analytics.update({
    //     where: { linkId: shortLink.id },
    //     data: {
    //       ...mergedData,
    //     },
    //   });
    // } else {
    //   await prisma.analytics.create({
    //     data: {
    //       ...mergedData,
    //       linkId: shortLink.id,
    //     },
    //   });
    // }
    // }

    return new Response(null, {
      headers: { Location: link },
      status: 302,
    });
  } catch (error) {
    console.error("error", error);
    return new Response(null, {
      headers: { Location: origin },
      status: 302,
    });
  }
};
