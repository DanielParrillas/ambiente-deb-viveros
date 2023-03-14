import { create } from "zustand";
import { DispiniblidadesDeUnViveroInterface } from "@/prisma/queries/disponibilidadesQueries";
import { EspecieSimpleInterface } from "@/prisma/queries/especiesQueries";
import { ViveroSimpleInterface } from "@/prisma/queries/viverosQueries";
import { Dayjs } from "dayjs";
import axios from "axios";

export interface DisponibilidadStore {
  id: "" | number;
  fecha: "" | string | Date | Dayjs;
  disponibles: "" | number;
  enProceso: "" | number;
  especie: EspecieSimpleInterface | "";
  vivero: ViveroSimpleInterface | "";
}

export const initialState: DisponibilidadStore = {
  id: "",
  fecha: "",
  disponibles: "",
  enProceso: "",
  especie: "",
  vivero: "",
};

interface DisponibilidadState {
  disponibilidad: DisponibilidadStore;
  disponibilidadesDeUnVivero: DispiniblidadesDeUnViveroInterface[];
  // limpiarDatos: (mantener?: "vivero" | "especie") => void;
  limpiarDatos: (mantener: "vivero" | "especie" | "nada") => void;
  setDisponibilidad: (data: DisponibilidadStore) => void;
  guardarDisponibilidad: (data: DisponibilidadStore) => void;
  setDisponibilidadDeunVivero: (
    data: DispiniblidadesDeUnViveroInterface[]
  ) => void;
  // actualizarDisponibilidadesDeunVivero: (
  //   temp: DispiniblidadesDeUnViveroInterface
  // ) => void;
}

export const useDisponibilidadStore = create<DisponibilidadState>()((set) => ({
  disponibilidad: initialState,
  disponibilidadesDeUnVivero: [],
  limpiarDatos: (mantener) => {
    switch (mantener) {
      case "especie":
        set((state) => ({
          disponibilidad: {
            ...initialState,
            especie: state.disponibilidad.especie,
          },
        }));
        break;
      case "vivero":
        set((state) => ({
          disponibilidad: {
            ...initialState,
            vivero: state.disponibilidad.vivero,
          },
        }));
        break;

      case "nada":
        set((state) => ({ disponibilidad: initialState }));
        break;
    }
  },
  setDisponibilidad: (data) =>
    set((state) => ({ disponibilidad: { ...data } })),
  guardarDisponibilidad: (data) => set((state) => ({ disponibilidad: data })),
  setDisponibilidadDeunVivero: (data: DispiniblidadesDeUnViveroInterface[]) =>
    set((state) => ({ disponibilidadesDeUnVivero: data })),
}));
