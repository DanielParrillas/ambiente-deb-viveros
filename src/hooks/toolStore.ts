import { create } from "zustand";
import { stableSort, getComparator } from "@/src/utils/sort";

export type ToolId =
  | "solicitudes"
  | "disponibilidades"
  | "dashboard"
  | "mantenimientos";

interface Tool {
  id: ToolId;
  titulo: string;
  descripcion: string;
  imagen: string;
  enConstruccion: boolean;
}

function createTool(
  id: ToolId,
  titulo: string,
  descripcion: string,
  imagen: string,
  enConstruccion: boolean = false
): Tool {
  return {
    id,
    titulo,
    descripcion,
    imagen,
    enConstruccion,
  };
}

const initialTools: Tool[] = [
  createTool(
    "solicitudes",
    "Solicitudes",
    "Atiende las peticiones de plantas",
    "tools/undraw_environment_iaus.svg"
  ),
  createTool(
    "disponibilidades",
    "Disponibilidades",
    "Actualiza la disponibilidades de plantas de cada vivero",
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

interface ToolState {
  tools: Tool[];
  toolSeleccionada: ToolId | "home";
  seleccionarTool: (toolId: ToolId) => void;
}

export const useToolStore = create<ToolState>()((set) => ({
  tools: stableSort(initialTools, getComparator("asc", "titulo")),
  toolSeleccionada: "home",
  seleccionarTool: (toolId) => set((state) => ({ toolSeleccionada: toolId })),
}));
