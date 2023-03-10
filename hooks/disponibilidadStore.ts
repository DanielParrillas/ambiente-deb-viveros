import { create } from "zustand";
import {
  NewDisponibilidad,
  UpdatedDisponibilidad,
} from "@/prisma/queries/disponibilidadesQueries";
import { DispiniblidadesDeUnViveroInterface } from "@/prisma/queries/disponibilidadesQueries";
import { EspecieSimpleInterface } from "@/prisma/queries/especiesQueries";

export const initialState = {
  id: "",
  fecha: "",
  disponibles: "",
  enProceso: "",
  especie: "",
  vivero: "",
};

export interface DisponibilidadStore {
  id: string | number;
  fecha: string | Date | string;
  disponibles: string | number;
  enProceso: string | number;
  especie: EspecieSimpleInterface | string;
  vivero: string | number;
}

interface DisponibilidadState {
  disponibilidad: DisponibilidadStore;
  disponibilidadesDeUnVivero: DispiniblidadesDeUnViveroInterface[];
  limpiarDatos: () => void;
  setDisponibilidad: (data: DisponibilidadStore) => void;
  guardarDisponibilidad: (data: DisponibilidadStore) => void;
  setDisponibilidadDeunVivero: (
    data: DispiniblidadesDeUnViveroInterface[]
  ) => void;
}

export const useDisponibilidadStore = create<DisponibilidadState>()((set) => ({
  disponibilidad: initialState,
  disponibilidadesDeUnVivero: [],
  limpiarDatos: () => set((state) => ({ disponibilidad: initialState })),
  setDisponibilidad: (data) =>
    set((state) => ({ disponibilidad: { ...data } })),
  guardarDisponibilidad: (data: any) =>
    set((state) => ({ disponibilidad: data })),
  setDisponibilidadDeunVivero: (data: DispiniblidadesDeUnViveroInterface[]) =>
    set((state) => ({ disponibilidadesDeUnVivero: data })),
}));
