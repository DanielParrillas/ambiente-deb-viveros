import { create } from "zustand";
import {
  NewDisponibilidad,
  UpdatedDisponibilidad,
} from "@/prisma/queries/disponibilidadesQueries";

const initialState = {
  id: "",
  fecha: "",
  disponibles: "",
  enProceso: "",
  especies: "",
  vivero: "",
};

interface DisponibilidadState {
  disponibilidad:
    | typeof initialState
    | NewDisponibilidad
    | UpdatedDisponibilidad;
  limpiarDatos: () => void;
  setDisponibilidad: (data: NewDisponibilidad | UpdatedDisponibilidad) => void;
  guardarDisponibilidad: (
    data: NewDisponibilidad | UpdatedDisponibilidad
  ) => void;
}

export const useDisponibilidadStore = create<DisponibilidadState>()((set) => ({
  disponibilidad: initialState,
  limpiarDatos: () => set((state) => ({ disponibilidad: initialState })),
  setDisponibilidad: (data) => set((state) => ({ disponibilidad: data })),
  guardarDisponibilidad: (data: any) =>
    set((state) => ({ disponibilidad: data })),
}));
