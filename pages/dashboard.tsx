import useSWR, { Fetcher } from "swr";
import axios from "axios";

import Example from "@/components/chart/barchart";
import { ViveroCompleteInterface } from "@/prisma/queries/viverosQueries";
import DisponibilidadesContmap from "@/components/chart/customcontentmap";
import Piechart from "@/components/chart/piechart";
const fetcher: Fetcher<ViveroCompleteInterface[], string> = (url: string) =>
  axios.get(url, { params: { tipo: "completo" } }).then((res) => res.data);

export default function Dashboard() {
  const { data: viveros, error: errorViveros } = useSWR(
    "/api/viveros",
    fetcher
  );

  if (errorViveros) {
    return <div>error</div>;
  }
  if (!viveros) {
    return <div>loading...</div>;
  }
  const dataForCustomContentTreemap = () => {
    let data: any[] = [];
    viveros.forEach((vivero) => {
      if (vivero.disponibilidadesPorEspecie.length > 0) {
        data.push({
          name: vivero.nombre,
          children: vivero.disponibilidadesPorEspecie.map((disponibilidad) => ({
            name: disponibilidad.especie.comun,
            size: disponibilidad.disponibles,
          })),
        });
      }
    });
    return data;
  };
  const dataForPieChart = () => {
    let data: any[] = [
      { name: "Vi1", value: 123 },
      { name: "vi2", value: 300 },
    ];
    return data;
  };
  console.log(dataForCustomContentTreemap());
  return (
    <div className="aspect-square flex flex-col">
      <Piechart />
      <Example />
    </div>
  );
}
