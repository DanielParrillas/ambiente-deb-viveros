import { create } from "zustand";
import { Prisma } from "@prisma/client";

interface Estado {
  id: number;
  nombre: string;
}

interface Solicitud {
  id: number | "";
  estado: Estado | "";
  nombres: string | "";
  apellidos: string | "";
  institucion: string | "";
  fechas: string | "";
  notas: string | "";
}

const initialSolicitud: Solicitud = {
  id: "",
  estado: "",
  nombres: "",
  apellidos: "",
  institucion: "",
  fechas: "",
  notas: "",
};

interface SolicitudState {
  solicitud: Solicitud;
}

export const useSolicitudStore = create<SolicitudState>()((set, get) => ({
  solicitud: initialSolicitud,
}));
