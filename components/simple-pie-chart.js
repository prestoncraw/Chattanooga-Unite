import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const data = [
  { name: "Advocacy & Bradley", value: 10 },
  { name: "Food & Hamilton", value: 30 },
  { name: "Clothing & Dade", value: 100 },
  { name: "Employment & Hamilton", value: 30 },
  { name: "Education & Rhea", value: 23 },
  { name: "Dental & Jackson", value: 34 },
];

// Define an array of colors to use for the chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FFC0CB"];

const SimplePieChart = () => {
  return (
    <div className="flex caption2 flex-col ui-chart">
      <div className="ml-24 flex justify-center flex-col w-48 items-center mt-32 mb-10">
        <p className="caption2">Metrics: Services and Counties</p>
      </div>
      <PieChart width={650} height={300}>
        <Pie
          data={data}
          dataKey="value"
          cx={325}
          cy={150}
          outerRadius={125}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default SimplePieChart;
