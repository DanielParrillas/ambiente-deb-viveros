import useSWR, { Fetcher } from "swr";
import axios from "axios";

import Example from "@/components/chart/firtChart";
import { ViveroInterfaceComplete } from "./api/viveros";

const fetcher: Fetcher<ViveroInterfaceComplete[], string> = (url: string) =>
  axios.get(url, { params: { tipo: "completo" } });

export default function Dashboard() {
  const { data: viveros, error: errorViveros } = useSWR("/api/vivero", fetcher);

  if (errorViveros) {
    return <div>error</div>;
  }
  if (!viveros) {
    return <div>loading...</div>;
  }
  return (
    <div className="w-full h-full">
      <Example />
    </div>
  );
}
