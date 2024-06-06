"use server";

import { weekDays } from "@/constants";
import { prisma } from "@/lib/prisma";

const addDays = (today: Date, days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date;
};

export const getTotalClicksCount = async (userId: string) => {
  try {
    const totalClicks = await prisma.click.count({
      where: {
        shortUrl: {
          userId,
        },
      },
    });
    return totalClicks;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getClicksCountByDays = async (days: number, userId: string) => {
  try {
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
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getClicksCountPerDay = async (userId: string) => {
  try {
    const totalClicks = await getTotalClicksCount(userId);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user?.createdAt) return null;

    const today = new Date();
    const registrationDate = new Date(user.createdAt);
    const registrationDaysInMs = today.getTime() - registrationDate.getTime();
    const days = Math.round(registrationDaysInMs / (1000 * 60 * 60 * 24));
    const clicksPerDay =
      days > 0 ? Math.round(totalClicks / days) : totalClicks;

    return clicksPerDay;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getMostClickedURLs = async (userId: string, limit = 5) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};

type Field = "browser" | "country" | "os";

export const getTopClicksCountBy = async (
  userId: string,
  field: Field,
  limit = 5
) => {
  try {
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
  } catch (error) {
    console.log(error);
    return [];
  }
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
  try {
    const clicks = await getClicksByDays(userId, -30);

    const monthlyClicks = Array(32).fill(0);

    clicks.forEach((click, i) => {
      const createdAt = new Date(click.createdAt);
      const date = createdAt.getDate();
      console.log("date", date);
      monthlyClicks[date]++;
      console.log(i + "---", monthlyClicks[date]);
    });

    // console.log("hourlyClicks", monthlyClicks);

    const res = monthlyClicks.map((v, i) => ({
      name: i,
      value: v,
    }));

    return rotateArray(res, 31 - new Date().getDate());
  } catch (error) {
    console.error(error);
  }
};

export const getClickByWeek = async (userId: string) => {
  try {
    const clicks = await getClicksByDays(userId, -7);

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
  } catch (error) {
    console.error(error);
  }
};

export const getClickByAnHour = async (userId: string) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};
