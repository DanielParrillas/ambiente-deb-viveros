import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";
import { stableSort, getComparator } from "@/src/utils/sort";

interface Tool {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  enConstruccion: boolean;
}

function createTool(
  id: string,
  titulo: string,
  descripcion: string,
  icono: string,
  enConstruccion: boolean = false
): Tool {
  return { id, titulo, descripcion, icono, enConstruccion };
}

const tools: Tool[] = [
  createTool(
    "solicitudes",
    "Solicitudes",
    "Atiende las peticiones de plantas",
    "tools/undraw_environment_iaus.svg"
  ),
  createTool(
    "disponibilidades",
    "Disponibilidades de plantas",
    "Actualiza la disponibilidades plantas de cada vivero",
    "tools/undraw_moving_re_pipp.svg"
  ),
  createTool(
    "dashboard",
    "Estadísticas",
    "Informe gráfico por viveros, especies y solicitudes",
    "tools/undraw_visual_data_re_mxxo.svg"
  ),
  createTool(
    "mantenimientos",
    "Mantenimientos",
    "Gestiona el estado de especies y viveros",
    "tools/undraw_control_panel_re_y3ar.svg",
    true
  ),
];

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "client" });

  useEffect(() => {
    console.log(hello.data);
  }, [hello.data]);

  return (
    <div className="h-auto grid content-center p-8 gap-12 lg:grid-cols-3 xl:grid-cols-3">
      {stableSort(tools, getComparator("asc", "titulo")).map((tool) => (
        <Link
          href={tool.enConstruccion ? "/" : tool.id}
          key={tool.id}
          className={`transition ease-in-out duration-300 select-none bg-white flex flex-col gap-2 justify-center items-center p-5 rounded-xl text-center ${
            tool.enConstruccion
              ? "cursor-default text-slate-300 opacity-70"
              : "cursor-pointer hover:shadow-lg text-slate-500 hover:text-slate-600"
          }`}
        >
          <Image
            alt={`icono de ${tool.id}`}
            width={150}
            height={150}
            src={tool.icono}
            className={tool.enConstruccion ? "opacity-40" : ""}
          />
          <h4 className="text-inherit">{tool.titulo}</h4>
          <p className="text-inherit">{tool.descripcion}</p>
        </Link>
      ))}
    </div>
  );
}
