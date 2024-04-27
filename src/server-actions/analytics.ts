"use server";

import { weekDays } from "@/constants";
import { prisma } from "@/lib/prisma";

const addDays = (today: Date, days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date;
};

export const getTotalClicksCount = async (userId: string) => {
  const totalClicks = await prisma.click.count({
    where: {
      shortUrl: {
        userId,
      },
    },
  });

  return totalClicks;
};

export const getClicksCountByDays = async (days: number, userId: string) => {
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

export const getClicksCountPerDay = async (userId: string) => {
  const totalClicks = await getTotalClicksCount(userId);

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

export const getMostClickedURLs = async (userId: string, limit = 5) => {
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

export const getTopClicksCountBy = async (
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

  const data = topClicks
    .map((click) => ({
      name: click[field],
      value: click._count[field],
    }))
    .filter((click) => click.name);

  return data;
};

export const getClicksByDays = async (userId: string, days: number) => {
  const today = new Date();

  const clicks = await prisma.click.findMany({
    where: {
      AND: {
        shortUrl: { userId },
        createdAt: {
          gte: addDays(today, days),
          lte: today,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return clicks;
};

const rotateArray = function (arr: any, k: number) {
  for (let i = 0; i < k; i++) {
    arr.unshift(arr.pop());
  }
  return arr;
};

export const getClickByMonth = async (userId: string) => {
  const clicks = await getClicksByDays(userId, -30);

  const hourlyClicks = Array(30).fill(0);

  clicks.forEach((click) => {
    const createdAt = new Date(click.createdAt);
    const date = createdAt.getDate();
    hourlyClicks[date]++;
  });

  const res = hourlyClicks.map((v, i) => ({
    name: i,
    value: v,
  }));

  return rotateArray(res, 29 - new Date().getDate());
};

export const getClickByWeek = async (userId: string) => {
  const clicks = await getClicksByDays(userId, -1);

  const weeklyClicks = Array(7).fill(0);

  clicks.forEach((click) => {
    const createdAt = new Date(click.createdAt);
    const day = createdAt.getDay();
    weeklyClicks[day]++;
  });

  const res = weeklyClicks.map((v, i) => ({
    name: weekDays[i],
    value: v,
  }));

  return rotateArray(res, 6 - new Date().getDay());
};

export const getClickByAnHour = async (userId: string) => {
  const clicks = await getClicksByDays(userId, -1);

  const hourlyClicks = Array(24).fill(0);

  clicks.forEach((click) => {
    const createdAt = new Date(click.createdAt);
    const hour = createdAt.getHours();
    hourlyClicks[hour]++;
  });

  const res = hourlyClicks.map((v, i) => ({
    name: i,
    value: v,
  }));

  return rotateArray(res, 23 - new Date().getHours());
};
