import { create } from "zustand";
import { z, ZodDate } from "zod";
import type {
  GeneralDataSimple,
  MunicipioSimple,
  EspecieSimple,
} from "@/types";

interface Detalle {
  id: number;
  especie: EspecieSimple | null;
  cantidad: number;
}

interface Asignacion {
  id: number;
  vivero: GeneralDataSimple;
  especie: EspecieSimple;
}

interface Solicitud {
  id: number | "";
  nombreDelSolicitante: string | "";
  apellidoDelSolicitante: string | "";
  institucionSolicitante: string | "";
  fechaDeSolicitud: string | "";
  lugarAReforestar: string | "";
  correoDelSolicitante: string | "";
  telefonoDelSolicitante: string | "" | null;
  celularDelSolicitante: string | "";
  notas: string | "" | null;
  estado: GeneralDataSimple | "";
  municipio: MunicipioSimple | "";
  asignacion: Asignacion | "";
  detalle: Detalle | "";
  asignaciones: Asignacion[];
  detalles: Detalle[];
}

const initialSolicitud: Solicitud = {
  id: "",
  nombreDelSolicitante: "",
  apellidoDelSolicitante: "",
  institucionSolicitante: "",
  fechaDeSolicitud: "",
  notas: "",
  celularDelSolicitante: "",
  telefonoDelSolicitante: "",
  correoDelSolicitante: "",
  lugarAReforestar: "",
  estado: "",
  municipio: "",
  detalle: "",
  asignacion: "",
  asignaciones: [],
  detalles: [],
};

interface SolicitudState {
  solicitud: Solicitud;
  setSolicitud: (data: Solicitud) => void;
  limpiarSolicitud: () => void;
}

export const useSolicitudStore = create<SolicitudState>()((set, get) => ({
  solicitud: initialSolicitud,
  setSolicitud: (data) => set((state) => ({ solicitud: { ...data } })),
  limpiarSolicitud: () => set((state) => ({ solicitud: initialSolicitud })),
}));
