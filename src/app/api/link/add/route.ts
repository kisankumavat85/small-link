import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { nanoid } from "nanoid";

import {
  type AddLinkReqBody,
  addLinkReqBodySchema,
} from "@/validation-schemas";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json<AddLinkReqBody>();
    const result = addLinkReqBodySchema.safeParse(body);

    if (result.success) {
      const slug = nanoid(6);
      const origin = new URL(request.url).origin;
      const shortLink = `${origin}/${slug}`;

      const KV = getRequestContext().env.SL_KV;
      await KV.put(slug, result.data.url);

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
    } else {
      return new Response(
        JSON.stringify({
          message: result.error.format().url?._errors.join(", "),
          success: false,
        })
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", success: false }),
      {
        status: 500,
      }
    );
  }
}
