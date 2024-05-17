"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export const getPageTitle = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch url: ${url}`);
    }

    const html = await response.text();
    const titleTag = html.match(/<title>(.*?)<\/title>/)?.[0];

    if (!titleTag) return null;

    const title = titleTag
      .replace("<title>", "")
      .replace("</title>", "")
      .trim();

    return title;
  } catch (error) {
    console.error("Error fetching page title:", error);
    return null;
  }
};

export const getAllLinks = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  try {
    const links = await prisma.shortURL.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        clicks: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const linkWithCount = links.map((l) => ({
      ...l,
      clickCount: l.clicks.length,
    }));

    return linkWithCount;
  } catch (error) {
    console.error("Error fetching links: ", error);
    return null;
  }
};
