import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { nanoid } from "nanoid";

import {
  type AddLinkReqBody,
  addLinkReqBodySchema,
} from "@/validation-schemas";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const runtime = "edge";
let expirationTime = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      expirationTime = 60 * 60 * 24 * 7;
    }

    const body = await request.json<AddLinkReqBody>();
    const result = addLinkReqBodySchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          message: result.error.format().url?._errors.join(", "),
          success: false,
        })
      );
    }

    const slug = nanoid(7);
    const origin = new URL(request.url).origin;
    const shortLink = `${origin}/${slug}`;

    const kv = getRequestContext().env.SL_KV;
    await kv.put(slug, result.data.url, {
      expirationTtl: result.data?.expiration || expirationTime,
    });

    if (session?.user?.id) {
      await prisma.shortURL.create({
        data: {
          slug,
          longLink: result.data.url,
          user: { connect: { id: session.user.id } },
        },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Link shortened",
        data: { shortLink, longLink: result.data.url },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", success: false }),
      {
        status: 500,
      }
    );
  }
}
