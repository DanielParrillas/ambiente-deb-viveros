import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
  { name: "Frutales", value: 400 },
  { name: "Forestales", value: 300 },
  { name: "Forestales", value: 30 },
];

const COLORS = ["#facc15", "#365314", "#831843"];

const PieChartComponent: React.FC = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={50}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={-10}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <label htmlFor=""></label>
    </PieChart>
  );
};

export default PieChartComponent;
