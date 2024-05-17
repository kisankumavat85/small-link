import type { NextRequest } from "next/server";

import { addLinkReqBodySchema } from "@/validation-schemas";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getPageTitle } from "@/server-actions/link";

let expirationTime = 60 * 60 * 24 * 30; // 30 days
const workerUrl = process.env.WORKER_URL;
const apiKey = process.env.API_KEY!;

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      expirationTime = 60 * 60 * 24 * 7; // 7 days
    }

    const body = await request.json();
    const result = addLinkReqBodySchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          message: result.error.format().url?._errors.join(", "),
          success: false,
        })
      );
    }

    const response = await fetch(`${workerUrl!}/api/link/add`, {
      method: "post",
      body: JSON.stringify({
        originalUrl: result.data.url,
        expiration: result.data.expiration ?? expirationTime,
      }),
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (response.status !== 200) {
      return new Response(
        JSON.stringify({ message: "Something went wrong", success: false }),
        {
          status: 500,
        }
      );
    }

    const jsonData = (await response.json()) as {
      success: boolean;
      slug: string;
      originalUrl: string;
    };

    if (session?.user?.id) {
      const title = await getPageTitle(jsonData.originalUrl);

      await prisma.shortURL.create({
        data: {
          slug: jsonData.slug,
          longLink: jsonData.originalUrl,
          title,
          user: { connect: { id: session.user.id } },
        },
      });
    }

    const origin = new URL(request.url).origin;
    const shortLink = `${origin}/${jsonData.slug}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Link shortened",
        data: { shortLink, longLink: jsonData.originalUrl },
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
