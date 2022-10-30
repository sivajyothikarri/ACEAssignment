import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const AsgPieChart: React.FC<{ chartData: any }> = ({ chartData }: any) => {
  const COLORS = ["#6648FF", "#71CE0D", "#B161D7", "#16CEB9", "#61dafb"];
  return (
    <ResponsiveContainer height={300}>
      <PieChart height={342}>
        <Pie
          data={chartData}
          dataKey={"empperc"}
          nameKey={"department"}
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
          isAnimationActive={false}
          label={(entry) => {
            return `${(entry.payload.empperc * 100).toFixed(2)}%`;
          }}
          labelLine={false}
        >
          {chartData.map((entry: any, index: number) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ marginLeft: "15rem" }}
          payload={chartData.map((item: any, index: number) => ({
            id: item.department,
            type: "circle",
            value: `${item.department}`,
            color: COLORS[index % COLORS.length],
          }))}
        ></Legend>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AsgPieChart;
