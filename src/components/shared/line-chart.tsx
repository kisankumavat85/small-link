"use client";

import React from "react";
import {
  LineChart as Chart,
  Line,
  Tooltip,
  XAxis,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    name: string;
    value: number | string;
  }[];
};

const LineChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart data={data}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "black",
            border: "1px solid white",
            borderRadius: "16px",
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
