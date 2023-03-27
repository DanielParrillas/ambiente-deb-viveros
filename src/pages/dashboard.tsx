import useSWR, { Fetcher } from "swr";
import axios from "axios";
import Image from "next/image";

import Example from "@/src/components/chart/barchart";
import { ViveroCompleteInterface } from "@/prisma/queries/viverosQueries";
import Piechart from "@/src/components/chart/piechart";
import Piechart2 from "@/src/components/chart/copiaPieChart";
import Grafico from "../components/chart/lineasMeta";
import GreenGradientFunnelChart from "./funnel-especies";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-3  bg-white p-12 rounded-lg shadow-md h-full">
      <h2>Árboles Entregados</h2>
      <div className="flex flex-col bg-pink-200 justify-center w-full md:h-32">
        <div className="relative w-full max-h-4 md:w-1/3 flex ">
          <Image
            src="undraw_environment_iaus.svg"
            alt="Descripción de la imagen 1"
            fill
          />
        </div>
        <div className="relative w-1/3 h-full">
          <Image
            src="undraw_environment_iaus.svg"
            alt="Descripción de la imagen 1"
            fill
          />
        </div>
        <div className="relative w-1/4">
          <Image
            src="undraw_environment_iaus.svg"
            alt="Descripción de la imagen 1"
            fill
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:w-1/3 lg:w-1/4">
        <Piechart2 />
      </div>
      <div className="flex flex-col -lg ">
        <Grafico />
      </div>
      <div className="flex flex-col -lg ">
        <GreenGradientFunnelChart />
      </div>
    </div>
  );
}
