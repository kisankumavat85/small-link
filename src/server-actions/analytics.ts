"use server";

import { prisma } from "@/lib/prisma";

const addDays = (today: Date, days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date;
};

export const getTotalClicks = async (userId: string) => {
  const totalClicks = await prisma.click.count({
    where: {
      shortUrl: {
        userId,
      },
    },
  });

  return totalClicks;
};

export const getClicksByDays = async (days: number, userId: string) => {
  const today = new Date();
  const clicks = await prisma.click.count({
    where: {
      AND: [
        { shortUrl: { userId } },
        { createdAt: { gte: addDays(today, days) } },
        { createdAt: { lte: today } },
      ],
    },
  });

  return clicks;
};

export const getClicksPerDay = async (userId: string) => {
  const totalClicks = await getTotalClicks(userId);

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user?.createdAt) return null;

  const today = new Date();
  const registrationDate = new Date(user.createdAt || today);
  const registrationDaysInMs = today.getTime() - registrationDate.getTime();
  const days = Math.round(registrationDaysInMs / (1000 * 60 * 60 * 24));
  const clicksPerDay = days > 0 ? Math.round(totalClicks / days) : totalClicks;

  return clicksPerDay;
};

export const getMostClickedURLs = async (userId: string, limit = 10) => {
  const mostClickedURLs = await prisma.shortURL.findMany({
    where: { userId },
    orderBy: {
      clicks: {
        _count: "desc",
      },
    },
    take: limit,
  });

  return mostClickedURLs;
};

type Field = "browser" | "country" | "os";

export const getTopClicksBy = async (
  userId: string,
  field: Field,
  limit = 5
) => {
  const topClicks = await prisma.click.groupBy({
    by: [field],
    where: {
      shortUrl: {
        userId,
      },
    },
    _count: {
      [field]: true,
    },
    orderBy: {
      _count: {
        [field]: "desc",
      },
    },
    take: limit,
  });

  if (topClicks.length === 1 && topClicks[0]._count[field] === 0) {
    return [];
  }

  const data = topClicks.map((click) => ({
    name: click[field],
    count: click._count[field],
  }));

  return data;
};
