import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = "edge";

type Params = { params: { slug: string } };

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
    const KV = getRequestContext().env.SL_KV;
    const link = await KV.get(slug);

    if (!link) {
      return new Response(null, {
        headers: { Location: origin },
        status: 302,
      });
    }

    return new Response(null, {
      headers: { Location: link },
      status: 302,
    });
  } catch (error) {}
};
