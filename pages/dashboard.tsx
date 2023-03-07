import useSWR, { Fetcher } from "swr";
import axios from "axios";

import Example from "@/components/chart/firtChart";
import { ViveroInterfaceComplete } from "./api/viveros";

const fetcher: Fetcher<ViveroInterfaceComplete[], string> = (url: string) =>
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
    const data = viveros.map((vivero) => ({
      name: vivero.nombre,
      children: vivero.disponibilidadesPorEspecie.map((disponibilidad) => ({
        name: disponibilidad.especie.comun,
        size: disponibilidad.disponibles,
      })),
    }));
    return data;
  };
  console.log(dataForCustomContentTreemap());
  return (
    <div className="w-full h-full">
      <Example />
    </div>
  );
}
