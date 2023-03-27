import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { name: "A", value: 10 },
  { name: "B", value: 20 },
  { name: "C", value: 30 },
];

const ExampleChart = () => {
  return (
    <div style={{ width: "90%", height: "80%" }}>
      <BarChart width={700} height={700} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#8884d8">
          <g viewBox="0 0 100% 100%">
            <text
              x="50%"
              y="0%"
              dy={-10}
              fill="#666"
              fontSize={12}
              textAnchor="end"
            >
              Label 1
            </text>
            <text
              x="50%"
              y="0%"
              dy={20}
              fill="#666"
              fontSize={12}
              textAnchor="end"
            >
              Label 2
            </text>
          </g>
        </Bar>
      </BarChart>
    </div>
  );
};
