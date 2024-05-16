import React from "react";
import { redirect } from "next/navigation";
import { Clock, MousePointerClick } from "lucide-react";

import {
  getClicksCountByDays,
  getClicksCountPerDay,
  getTopClicksCountBy,
  getTotalClicksCount,
  getClickByAnHour,
  getClickByWeek,
  getClickByMonth,
} from "@/server-actions/analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BarChart from "../shared/bar-chart";
import LineChart from "../shared/line-chart";
import { Session } from "next-auth";

const Dashboard = async ({ session }: { session: Session }) => {
  const userId = session?.user?.id;
  if (!userId) return redirect("/");

  const totalClicks = await getTotalClicksCount(userId);
  const clicksToday = await getClicksCountByDays(-1, userId);
  const clicksThisWeek = await getClicksCountByDays(-7, userId);
  const clicksThisMonth = await getClicksCountByDays(-30, userId);
  const clicksPerDay = await getClicksCountPerDay(userId);
  const topClicksByBrowsers = await getTopClicksCountBy(userId, "browser");
  const topClicksByCountries = await getTopClicksCountBy(userId, "country");
  const topClicksByOs = await getTopClicksCountBy(userId, "os");
  const clicksByMonth = await getClickByMonth(userId);
  const clicksByWeek = await getClickByWeek(userId);
  const clicksByAnHour = await getClickByAnHour(userId);

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-9 grid-cols-1 gap-6">
        <div className="dark-gradient  rounded-2xl border file:rounded-2xl p-4 col-span-3 flex flex-col gap-2 justify-between">
          <h3 className="flex flex-col">
            <span className="text">Hello,</span>
            <span className="text-3xl font-sansBungee">
              {session.user?.name?.split(" ")[0]}
            </span>
          </h3>
        </div>
        <div className="bg-black rounded-2xl border p-4 col-span-3 flex flex-col gap-2 justify-between">
          <div className="flex">
            <div className="p-2 bg-secondary rounded-md">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-gray-500">Total clicks</h3>
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl font-bold">{totalClicks}</h2>
            <span className="text-gray-500 text-sm">clicks</span>
          </div>
        </div>
        <div className="bg-black rounded-2xl border p-4 col-span-3 flex flex-col gap-2 justify-between">
          <div className="flex">
            <div className="p-2 bg-secondary rounded-md">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-gray-500">Daily Average</h3>
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl font-bold">{clicksPerDay}</h2>
            <span className="text-gray-500 text-sm">clicks</span>
          </div>
        </div>

        <div className="col-span-5 w-full bg-black rounded-2xl border p-4">
          <Tabs
            defaultValue="today"
            className="flex flex-col items-start gap-8"
          >
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="thisWeek">This Week</TabsTrigger>
              <TabsTrigger value="thisMonth">This Month</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="w-full h-[200px]">
              <LineChart data={clicksByAnHour} />
            </TabsContent>
            <TabsContent value="thisWeek" className="w-full h-[200px]">
              <LineChart data={clicksByWeek} />
            </TabsContent>
            <TabsContent value="thisMonth" className="w-full h-[200px]">
              <LineChart data={clicksByMonth} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-4 w-full bg-black rounded-2xl border p-4">
          <Tabs
            defaultValue="countries"
            className="flex flex-col items-start gap-8"
          >
            <TabsList>
              <TabsTrigger value="countries">Countries</TabsTrigger>
              <TabsTrigger value="browsers">Browsers</TabsTrigger>
              <TabsTrigger value="os">OS</TabsTrigger>
            </TabsList>
            <TabsContent value="countries" className="w-full h-[200px]">
              <BarChart data={topClicksByCountries} />
            </TabsContent>
            <TabsContent value="browsers" className="w-full h-[200px]">
              <BarChart data={topClicksByBrowsers} />
            </TabsContent>
            <TabsContent value="os" className="w-full h-[200px]">
              <BarChart data={topClicksByOs} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-black rounded-2xl border p-4 col-span-3 flex flex-col gap-2 justify-between">
          <h3 className="text-gray-500">Today</h3>
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl font-bold">{clicksToday}</h2>
            <span className="text-gray-500 text-sm">clicks</span>
          </div>
        </div>
        <div className="bg-black rounded-2xl border p-4 col-span-3 flex flex-col gap-2 justify-between">
          <h3 className="text-gray-500">This Week</h3>
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl font-bold">{clicksThisWeek}</h2>
            <span className="text-gray-500 text-sm">clicks</span>
          </div>
        </div>
        <div className="bg-black rounded-2xl border p-4 col-span-3 flex flex-col gap-2 justify-between">
          <h3 className="text-gray-500">This Month</h3>
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl font-bold">{clicksThisMonth}</h2>
            <span className="text-gray-500 text-sm">clicks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
