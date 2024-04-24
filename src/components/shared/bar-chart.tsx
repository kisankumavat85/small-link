"use client";

import {
  BarChart as Chart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    name: string;
    value: number | string;
  }[];
};

const BarChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart data={data}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "black",
            border: "none",
            borderRadius: "16px",
          }}
        />
        <Bar dataKey="value" fill="#ffffff" barSize={40} radius={10} />
      </Chart>
    </ResponsiveContainer>
  );
};

export default BarChart;
