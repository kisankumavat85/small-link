import { prisma } from "@/lib/prisma";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";
import Bowser from "bowser";
import { Analytics } from "@prisma/client";

export const runtime = "edge";

type Params = { params: { slug: string } };

type NewAnalytics = Omit<
  Analytics,
  "id" | "linkId" | "clicks" | "createdAt" | "modifiedAt"
>;

const mergeData = (prevData: Analytics, data: NewAnalytics) => {};

export const GET = async (
  request: NextRequest,
  { params: { slug } }: Params
) => {
  const origin = new URL(request.url).origin;

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

    const shortLink = await prisma.shortURL.findUnique({
      where: {
        slug: slug,
      },
    });

    console.log("shortLink >>", shortLink);

    if (!shortLink?.id) {
      return new Response(null, {
        headers: { Location: origin },
        status: 302,
      });
    }

    const prevAnalytics = await prisma.analytics.findUnique({
      where: {
        linkId: shortLink.id,
      },
    });

    const { os, browser } = Bowser.parse(
      request.headers.get("User-Agent") || ""
    );

    const data = {
      os,
      browser,
    };

    mergeData(prevAnalytics, data);

    console.log("prevAnalytics >>", prevAnalytics);

    return new Response(null, {
      headers: { Location: link },
      status: 302,
    });
  } catch (error) {}
};
