import { responsiveFontSizes } from "@mui/material";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const data = [
  { name: "FRUTALES", value: 500 },
  { name: "FORESTALES", value: 400 },
  { name: "OTROS", value: 100 },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + outerRadius * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * cx * 0.15;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g width={"100%"}>
      <text
        x={cx}
        y={cy}
        dy={"0%"}
        textAnchor="middle"
        fill={fill}
        fontSize={(cx + cy) * 0.035}
      >
        {payload.name}
        {`Arboles entregados: ${value}`}
      </text>
      #sector del pie chart interno
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius + (cx + cy) * 0.0001}
        outerRadius={outerRadius + (cx + cy) * 0.0001}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      #sector del piechart externo
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + (cx + cy) * 0.01}
        outerRadius={outerRadius + (cx + cy) * 0.02}
        fill={fill}
      />
    </g>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <ResponsiveContainer
      width="100%"
      height={"100%"}
      aspect={1.5}
      maxHeight={400}
    >
      <PieChart barSize={"100%"} layout="radial">
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={"45%"}
          cy={"40%"}
          innerRadius={"40%"}
          outerRadius={"60%"}
          fill="#2A9B00"
          dataKey="value"
          onMouseEnter={onPieEnter}
          startAngle={0}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
