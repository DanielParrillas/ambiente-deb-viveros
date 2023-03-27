import React from "react";
import {
  FunnelChart,
  Tooltip,
  Funnel,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const colorForestales = [
  "#1b5e20",
  "#2e7d32",
  "#388e3c",
  "#43a047",
  "#4caf50",
  "#66bb6a",
  "#81c784",
  "#b9f6ca",
  "#a5d6a7",
  "#c8e6c9",
  "#e8f5e9",
];

const data = [
  {
    value: 100,
    name: "planta 1",
  },
  {
    value: 80,
    name: "planta 2",
  },
  {
    value: 50,
    name: "planta 3",
  },
  {
    value: 40,
    name: "planta 4",
  },
  {
    value: 26,
    name: "planta 5",
  },
];

const piramideChart = () => (
  <ResponsiveContainer width="50%" height={400}>
    <FunnelChart width={730} height={250}>
      <Tooltip />
      <Funnel dataKey="value" data={data} isAnimationActive fill="#1b5e20">
        <LabelList
          position="center"
          fill="#e8f5e9"
          stroke="none"
          dataKey="name"
        />
      </Funnel>
    </FunnelChart>
  </ResponsiveContainer>
);

export default piramideChart;
