import { useState, useEffect, useCallback } from "react";
import {
  getClicksCountByDays,
  getClicksCountPerDay,
  getTopClicksCountBy,
  getTotalClicksCount,
  getClickByAnHour,
  getClickByWeek,
  getClickByMonth,
} from "@/server-actions/analytics";

interface AnalyticsData {
  totalClicks: null | number;
  clicksToday: null | number;
  clicksThisWeek: null | number;
  clicksThisMonth: null | number;
  clicksPerDay: null | number;
  topClicksByBrowsers: {
    name: string | null;
    value: never;
  }[];
  topClicksByCountries: {
    name: string | null;
    value: never;
  }[];
  topClicksByOs: {
    name: string | null;
    value: never;
  }[];
  clicksByMonth: any[];
  clicksByWeek: any[];
  clicksByAnHour: any[];
}

const useAnalytics = (userId: string) => {
  const [data, setData] = useState<AnalyticsData>({
    totalClicks: null,
    clicksToday: null,
    clicksThisWeek: null,
    clicksThisMonth: null,
    clicksPerDay: null,
    topClicksByBrowsers: [],
    topClicksByCountries: [],
    topClicksByOs: [],
    clicksByMonth: [],
    clicksByWeek: [],
    clicksByAnHour: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      const [
        totalClicks,
        clicksToday,
        clicksThisWeek,
        clicksThisMonth,
        clicksPerDay,
        topClicksByBrowsers,
        topClicksByCountries,
        topClicksByOs,
        clicksByMonth,
        clicksByWeek,
        clicksByAnHour,
      ] = await Promise.allSettled([
        getTotalClicksCount(userId),
        getClicksCountByDays(-1, userId),
        getClicksCountByDays(-7, userId),
        getClicksCountByDays(-30, userId),
        getClicksCountPerDay(userId),
        getTopClicksCountBy(userId, "browser"),
        getTopClicksCountBy(userId, "country"),
        getTopClicksCountBy(userId, "os"),
        getClickByMonth(userId),
        getClickByWeek(userId),
        getClickByAnHour(userId),
      ]);

      setData({
        totalClicks:
          totalClicks.status === "fulfilled" ? totalClicks.value : null,
        clicksToday:
          clicksToday.status === "fulfilled" ? clicksToday.value : null,
        clicksThisWeek:
          clicksThisWeek.status === "fulfilled" ? clicksThisWeek.value : null,
        clicksThisMonth:
          clicksThisMonth.status === "fulfilled" ? clicksThisMonth.value : null,
        clicksPerDay:
          clicksPerDay.status === "fulfilled" ? clicksPerDay.value : null,
        topClicksByBrowsers:
          topClicksByBrowsers.status === "fulfilled"
            ? topClicksByBrowsers.value
            : [],
        topClicksByCountries:
          topClicksByCountries.status === "fulfilled"
            ? topClicksByCountries.value
            : [],
        topClicksByOs:
          topClicksByOs.status === "fulfilled" ? topClicksByOs.value : [],
        clicksByMonth:
          clicksByMonth.status === "fulfilled" ? clicksByMonth.value : null,
        clicksByWeek:
          clicksByWeek.status === "fulfilled" ? clicksByWeek.value : null,
        clicksByAnHour:
          clicksByAnHour.status === "fulfilled" ? clicksByAnHour.value : null,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAnalytics();
  }, [userId, fetchAnalytics]);

  return { data, loading, error };
};

export default useAnalytics;
