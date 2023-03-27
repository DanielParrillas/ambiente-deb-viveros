import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "2022-01-01",
    vivero: "Vivero 1",
    arbolesEntregados: 50,
    meta: 400,
    avenceMeta: 50,
  },
  {
    name: "2022-02-01",
    vivero: "Vivero 1",
    arbolesEntregados: 100,
    meta: 400,
    avenceMeta: 125,
  },
  {
    name: "2022-03-01",
    vivero: "Vivero 1",
    arbolesEntregados: 50,
    meta: 400,
    avenceMeta: 225,
  },
  {
    name: "2022-04-01",
    vivero: "Vivero 1",
    arbolesEntregados: 120,
    meta: 400,
    avenceMeta: 350,
  },
  {
    name: "2022-01-01",
    vivero: "Vivero 2",
    arbolesEntregados: 100,
    meta: 400,
    avenceMeta: 225,
  },
  {
    name: "2022-02-01",
    vivero: "Vivero 2",
    arbolesEntregados: 75,
    meta: 200,
    avenceMeta: 225,
  },
  {
    name: "2022-03-01",
    vivero: "Vivero 2",
    arbolesEntregados: 100,
    meta: 200,
    avenceMeta: 225,
  },
  {
    name: "2022-04-01",
    vivero: "Vivero 2",
    arbolesEntregados: 125,
    meta: 200,
    avenceMeta: 225,
  },
  {
    name: "2022-01-01",
    vivero: "Vivero 3",
    arbolesEntregados: 50,
    meta: 300,
    avenceMeta: 225,
  },
  {
    name: "2022-02-01",
    vivero: "Vivero 3",
    arbolesEntregados: 75,
    meta: 300,
    avenceMeta: 225,
  },
  {
    name: "2022-03-01",
    vivero: "Vivero 3",
    arbolesEntregados: 100,
    meta: 300,
    avenceMeta: 225,
  },
  {
    name: "2022-04-01",
    vivero: "Vivero 3",
    arbolesEntregados: 125,
    meta: 300,
    avenceMeta: 225,
  },
  {
    name: "2022-01-01",
    vivero: "Vivero 4",
    arbolesEntregados: 50,
    meta: 100,
    avenceMeta: 225,
  },
  {
    name: "2022-02-01",
    vivero: "Vivero 5",
    arbolesEntregados: 75,
    meta: 400,
    avenceMeta: 225,
  },
  {
    name: "2022-03-01",
    vivero: "Vivero 5",
    arbolesEntregados: 100,
    meta: 400,
    avenceMeta: 225,
  },
  {
    name: "2022-04-01",
    vivero: "Vivero 6",
    arbolesEntregados: 125,
    meta: 500,
    avenceMeta: 225,
  },
  {
    name: "2022-01-01",
    vivero: "Vivero 6",
    arbolesEntregados: 50,
    meta: 500,
    avenceMeta: 225,
  },
  {
    name: "2022-02-01",
    vivero: "Vivero 7",
    arbolesEntregados: 75,
    meta: 600,
    avenceMeta: 225,
  },
  {
    name: "2022-03-01",
    vivero: "Vivero 8",
    arbolesEntregados: 100,
    meta: 700,
    avenceMeta: 225,
  },
  {
    name: "2022-04-01",
    vivero: "Vivero 8",
    arbolesEntregados: 125,
    meta: 700,
    avenceMeta: 225,
  },
  {
    name: "2022-01-01",
    vivero: "Vivero 8",
    arbolesEntregados: 50,
    meta: 700,
    avenceMeta: 225,
  },
  {
    name: "2022-02-01",
    vivero: "Vivero 9",
    arbolesEntregados: 75,
    meta: 800,
    avenceMeta: 225,
  },
  {
    name: "2022-03-01",
    vivero: "Vivero 9",
    arbolesEntregados: 100,
    meta: 800,
    avenceMeta: 225,
  },
  {
    name: "2022-04-01",
    vivero: "Vivero 9",
    arbolesEntregados: 125,
    meta: 800,
    avenceMeta: 225,
  },
  {
    name: "2022-01-01",
    vivero: "Vivero 10",
    arbolesEntregados: 50,
    meta: 1000,
    avenceMeta: 225,
  },
  {
    name: "2022-02-01",
    vivero: "Vivero 10",
    arbolesEntregados: 75,
    meta: 1000,
    avenceMeta: 225,
  },
  {
    name: "2022-03-01",
    vivero: "Vivero 11",
    arbolesEntregados: 100,
    meta: 2000,
    avenceMeta: 225,
  },
  {
    name: "2022-04-01",
    vivero: "Vivero 11",
    arbolesEntregados: 125,
    meta: 2000,
    avenceMeta: 225,
  },
  {
    name: "2022-01-01",
    vivero: "Vivero 12",
    arbolesEntregados: 50,
    meta: 2000,
    avenceMeta: 225,
  },
  {
    name: "2022-02-01",
    vivero: "Vivero 12",
    arbolesEntregados: 75,
    meta: 2000,
    avenceMeta: 225,
  },
  {
    name: "2022-03-01",
    vivero: "Vivero 12",
    arbolesEntregados: 400,
    meta: 2000,
    avenceMeta: 225,
  },
  {
    name: "2022-04-01",
    vivero: "Vivero 12",
    arbolesEntregados: 125,
    meta: 2000,
    avenceMeta: 225,
  },
  // Datos para otros viveros
];

const BarChartComponent = () => {
  const [viveroSeleccionado, setViveroSeleccionado] = useState("Todos");

  const handleChangeVivero = (e: any) => {
    setViveroSeleccionado(e.target.value);
  };

  const dataFiltrados =
    viveroSeleccionado === "Todos"
      ? data
      : data.filter((d) => d.vivero === viveroSeleccionado);

  return (
    <div>
      <label>
        Vivero:
        <select value={viveroSeleccionado} onChange={handleChangeVivero}>
          <option value="Todos">Todos</option>
          <option value="Vivero 1">Vivero 1</option>
          <option value="Vivero 2">Vivero 2</option>
          <option value="Vivero 3">Vivero 3</option>
          <option value="Vivero 4">Vivero 4</option>
          <option value="Vivero 5">Vivero 5</option>
          <option value="Vivero 6">Vivero 6</option>
          <option value="Vivero 7">Vivero 7</option>
          <option value="Vivero 8">Vivero 8</option>
          <option value="Vivero 9">Vivero 9</option>
          <option value="Vivero 10">Vivero 10</option>
          <option value="Vivero 11">Vivero 11</option>
          <option value="Vivero 12">Vivero 12</option>
          {/* Otras opciones para los otros viveros */}
        </select>
      </label>
      <ResponsiveContainer aspect={2} maxHeight={300}>
        <LineChart width={200} height={700} data={dataFiltrados}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
          <Legend verticalAlign="top" height={40} />
          <Line
            type="monotone"
            dataKey="meta"
            name="Meta"
            stroke="#64dd17"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="arbolesEntregados"
            name="Arboles entregados"
            stroke="#00c853"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="avenceMeta"
            name="Avance de meta"
            stroke="#1b5e20"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
