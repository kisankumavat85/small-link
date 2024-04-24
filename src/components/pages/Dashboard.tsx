import React from "react";
import { redirect } from "next/navigation";
import { Clock, MousePointerClick } from "lucide-react";

import { auth } from "@/auth";
import {
  getClicksByDays,
  getClicksPerDay,
  getMostClickedURLs,
  getTopClicksBy,
  getTotalClicks,
} from "@/server-actions/analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BarChart from "../shared/bar-chart";
import LineChart from "../shared/line-chart";

const data = [
  {
    name: "Mon",
    value: 100,
  },
  {
    name: "Tue",
    value: 139,
  },
  {
    name: "Wed",
    value: 580,
  },
  {
    name: "Thr",
    value: 390,
  },
  {
    name: "Fri",
    value: 480,
  },
  {
    name: "Sat",
    value: 380,
  },
  {
    name: "Sun",
    value: 430,
  },
];

const Dashboard = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return redirect("/");

  const [
    totalClicks,
    clicksToday,
    clicksThisWeek,
    clicksThisMonth,
    clicksPerDay,
    mostClickedUrls,
    topClicksByBrowsers,
    topClicksByCountries,
    topClicksByOs,
  ] = await Promise.all([
    getTotalClicks(userId),
    getClicksByDays(-1, userId),
    getClicksByDays(-7, userId),
    getClicksByDays(-30, userId),
    getClicksPerDay(userId),
    getMostClickedURLs(userId),
    getTopClicksBy(userId, "browser"),
    getTopClicksBy(userId, "country"),
    getTopClicksBy(userId, "os"),
  ]);

  console.log("topClicksByBrowsers", topClicksByBrowsers);

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-6 grid-cols-1 gap-6">
        <div className="dark-gradient  rounded-2xl border file:rounded-2xl p-4 col-span-2 flex flex-col gap-2 justify-between">
          <h3 className="flex flex-col">
            <span className="text">Hello,</span>
            <span className="text-3xl font-sansBungee">
              {session.user?.name?.split(" ")[0]}
            </span>
          </h3>
        </div>
        <div className="bg-black rounded-2xl border p-4 col-span-2 flex flex-col gap-2 justify-between">
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
        <div className="bg-black rounded-2xl border p-4 col-span-2 flex flex-col gap-2 justify-between">
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

        <div className="col-span-3 w-full bg-black rounded-2xl border p-4">
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
              <BarChart data={data} />
            </TabsContent>
            <TabsContent value="thisWeek" className="w-full h-[200px]">
              <BarChart data={data} />
            </TabsContent>
            <TabsContent value="thisMonth" className="w-full h-[200px]">
              <BarChart data={data} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-3 w-full bg-black rounded-2xl border p-4">
          <Tabs
            defaultValue="today"
            className="flex flex-col items-start gap-8"
          >
            <TabsList>
              <TabsTrigger value="today">Countries</TabsTrigger>
              <TabsTrigger value="thisWeek">Browsers</TabsTrigger>
              <TabsTrigger value="thisMonth">OS</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="w-full h-[200px]">
              <LineChart data={data} />
            </TabsContent>
            <TabsContent value="thisWeek" className="w-full h-[200px]">
              <BarChart data={data} />
            </TabsContent>
            <TabsContent value="thisMonth" className="w-full h-[200px]">
              <BarChart data={data} />
            </TabsContent>
          </Tabs>
        </div>

        {/* <div className="bg-black rounded-2xl border p-4 col-span-3 flex flex-col gap-2 justify-between">
          <Tabs
            defaultValue="today"
            className="flex flex-col items-start gap-8"
          >
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="thisWeek">This Week</TabsTrigger>
              <TabsTrigger value="thisMonth">This Month</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="w-full">
              <div className="bg-black rounded-2xl border p-4 col-span-2 flex flex-col gap-2 justify-between">
                <h3 className="text-gray-500">Today</h3>
                <div className="flex gap-2 items-end">
                  <h2 className="text-3xl font-bold">{clicksToday}</h2>
                  <span className="text-gray-500 text-sm">clicks</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="thisWeek">
              <h3 className="text-gray-500">This Week</h3>
              <div className="flex gap-2 items-end">
                <h2 className="text-3xl font-bold">{clicksThisWeek}</h2>
                <span className="text-gray-500 text-sm">clicks</span>
              </div>
            </TabsContent>
            <TabsContent value="thisMonth">
              <h3 className="text-gray-500">This Month</h3>
              <div className="flex gap-2 items-end">
                <h2 className="text-3xl font-bold">{clicksThisMonth}</h2>
                <span className="text-gray-500 text-sm">clicks</span>
              </div>{" "}
            </TabsContent>
          </Tabs>
        </div> */}

        <div className="bg-black rounded-2xl border p-4 col-span-2 flex flex-col gap-2 justify-between">
          <h3 className="text-gray-500">Today</h3>
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl font-bold">{clicksToday}</h2>
            <span className="text-gray-500 text-sm">clicks</span>
          </div>
        </div>
        <div className="bg-black rounded-2xl border p-4 col-span-2 flex flex-col gap-2 justify-between">
          <h3 className="text-gray-500">This Week</h3>
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl font-bold">{clicksThisWeek}</h2>
            <span className="text-gray-500 text-sm">clicks</span>
          </div>
        </div>
        <div className="bg-black rounded-2xl border p-4 col-span-2 flex flex-col gap-2 justify-between">
          <h3 className="text-gray-500">This Month</h3>
          <div className="flex gap-2 items-end">
            <h2 className="text-3xl font-bold">{clicksThisMonth}</h2>
            <span className="text-gray-500 text-sm">clicks</span>
          </div>
        </div>

        {/* <div className="bg-black rounded-2xl border p-4 col-span-3 flex flex-col gap-2 justify-between">
          <h3 className="text-gray-500">Most clicked Links</h3>

          <ul className="">
            {mostClickedUrls.map((url) => (
              <li key={url.id} className="">
                {url.slug}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
