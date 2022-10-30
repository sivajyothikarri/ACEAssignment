import { memo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";

const AsgBarChart: React.FC<{ chartData: any }> = ({ chartData }) => {
  return (
    <ResponsiveContainer height={220}>
      <BarChart
        data={chartData}
        barCategoryGap={8}
        margin={{
          top: 25,
          right: 15,
          left: 15,
        }}
      >
        <CartesianGrid
          horizontal={false}
          vertical={false}
          stroke="grey"
          strokeDasharray="5 5"
        />
        <Tooltip active />
        <XAxis
          tickLine={false}
          axisLine={true}
          tick={{ fontSize: "0.625rem" }}
          allowDecimals={false}
          dataKey="department"
        />
        <YAxis type="number" tickLine={false} tick={{ fontSize: "0.625rem" }} />
        <Bar dataKey="budget" fill="#0000FF" stackId="a" maxBarSize={35}>
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
export default memo(AsgBarChart);
