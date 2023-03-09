import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
  Rectangle,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 9800,
    pv: 2000,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 7000,
    pv: 3700,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 18900,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 23900,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 34900,
    pv: 16700,
    amt: 2100,
  },
];

// using Customized gives you access to all relevant chart props
const CustomizedRectangle = (props: any) => {
  const { formattedGraphicalItems } = props;
  console.log(props);
  // get first and second series in chart
  const firstSeries = formattedGraphicalItems[0];
  const secondSeries = formattedGraphicalItems[1];

  // render custom content using points from the graph
  return firstSeries?.props?.points.map((_: any, index: number) => {
    const firstSeriesPoint = firstSeries?.props?.points[index];
    const secondSeriesPoint = secondSeries?.props?.points[index];
    const yDiff = firstSeriesPoint.y - secondSeriesPoint.y;

    return (
      <Rectangle
        width={10}
        height={-yDiff}
        x={firstSeriesPoint.x - 5}
        y={firstSeriesPoint.y}
        fill={
          yDiff < firstSeriesPoint.y * 0.5
            ? "red"
            : yDiff > firstSeriesPoint.y * 0.5
            ? "green"
            : "none"
        }
      />
    );
  });
};

const Linebar = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        <Customized component={CustomizedRectangle} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Linebar;
