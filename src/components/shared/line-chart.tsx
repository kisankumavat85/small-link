"use client";

import React from "react";
import {
  LineChart as Chart,
  Line,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  YAxis,
  CartesianGrid,
} from "recharts";

type Props = {
  data: {
    name: any;
    value: number | string;
  }[];
};

const LineChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart data={data} margin={{ right: 30, left: 20 }}>
        <CartesianGrid vertical={false} strokeOpacity={0.2} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tickMargin={5}
        />
        <YAxis hide dataKey="value" axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "black",
            border: "1px solid #414141",
            borderRadius: "10px",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ffffff"
          strokeWidth={2}
          dot={false}
        />
      </Chart>
    </ResponsiveContainer>
  );
};

export default LineChart;
