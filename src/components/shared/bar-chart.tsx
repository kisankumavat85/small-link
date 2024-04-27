"use client";

import {
  BarChart as Chart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
  CartesianGrid,
} from "recharts";

type Props = {
  data: {
    name: any;
    value: number | string;
  }[];
  barSize?: number;
  showBrush?: boolean;
  angle?: number;
  fontSize?: number;
  textAnchor?: "end";
};

const BarChart = ({
  data,
  barSize = 40,
  showBrush,
  angle,
  fontSize,
}: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart data={data} barCategoryGap={5}>
        <CartesianGrid vertical={false} strokeOpacity={0.2} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          angle={angle}
          fontSize={fontSize}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "black",
            border: "none",
            borderRadius: "16px",
          }}
        />
        {showBrush && (
          <Brush dataKey="name" height={5} stroke="#656565" fill="#000000" />
        )}
        <Bar dataKey="value" fill="#ffffff" barSize={barSize} radius={10} />
      </Chart>
    </ResponsiveContainer>
  );
};

export default BarChart;
