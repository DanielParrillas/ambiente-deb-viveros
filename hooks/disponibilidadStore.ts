import { create } from "zustand";
import { DispiniblidadesDeUnViveroInterface } from "@/prisma/queries/disponibilidadesQueries";
import { EspecieSimpleInterface } from "@/prisma/queries/especiesQueries";
import { ViveroSimpleInterface } from "@/prisma/queries/viverosQueries";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import {
  EstadoPeticionError,
  EstadoPeticionOk,
  DisponibilidadPOST,
  DisponibilidadPUT,
} from "@/types";

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
  limpiarDisponibilidad: (mantener: "vivero" | "especie" | "nada") => void;
  setDisponibilidad: (data: DisponibilidadStore) => void;
  guardarDisponibilidad: () => Promise<EstadoPeticionError | EstadoPeticionOk>;
  setDisponibilidadDeunVivero: (
    data: DispiniblidadesDeUnViveroInterface[]
  ) => void;
  getDisponibilidadesDeunVivero: (
    viveroId: string | string[]
  ) => Promise<EstadoPeticionError | EstadoPeticionOk>;
  deleteDisponibilidad: () => Promise<EstadoPeticionError | EstadoPeticionOk>;
}

export const useDisponibilidadStore = create<DisponibilidadState>()(
  (set, get) => ({
    disponibilidad: initialState,
    disponibilidadesDeUnVivero: [],
    limpiarDisponibilidad: (mantener) => {
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
    setDisponibilidadDeunVivero: (data: DispiniblidadesDeUnViveroInterface[]) =>
      set((state) => ({ disponibilidadesDeUnVivero: data })),
    getDisponibilidadesDeunVivero: async (viveroId) => {
      let estado: EstadoPeticionError | EstadoPeticionOk = {
        ok: true,
        mensaje: "...",
      };

      await axios
        .get(`/api/disponibilidades/${viveroId}`)
        .then(({ data }) =>
          set((state) => ({ disponibilidadesDeUnVivero: data }))
        )
        .catch((error) => {
          console.log(error);
          estado = { ok: false, error: error };
        });

      return estado;
    },
    guardarDisponibilidad: async () => {
      let estado: EstadoPeticionError | EstadoPeticionOk = {
        ok: true,
        mensaje: "...",
      };
      const disponibilidad = get().disponibilidad;
      if (
        disponibilidad.disponibles !== "" &&
        disponibilidad.enProceso !== "" &&
        disponibilidad.especie !== "" &&
        disponibilidad.vivero !== "" &&
        disponibilidad.fecha !== ""
      ) {
        let data: DisponibilidadPOST | DisponibilidadPUT = {
          disponibles: disponibilidad.disponibles,
          enProceso: disponibilidad.enProceso,
          fecha: dayjs(disponibilidad.fecha).utc(false).format(),
          especieId: disponibilidad.especie.id,
          viveroId: disponibilidad.vivero.id,
        };
        if (disponibilidad.id === "") {
          await axios
            .post(`/api/disponibilidades`, data)
            .then((response) => {
              console.log("nuevo");
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
              estado = { ok: false, error: error };
            });
        } else {
          await axios
            .put(`/api/disponibilidades/${disponibilidad.id}`, data)
            .then((response) => {
              console.log("actualizacion");
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
              estado = { ok: false, error: error };
            });
        }
      } else {
        console.warn("mmm");
      }

      return estado;
    },
    deleteDisponibilidad: async () => {
      let estado: EstadoPeticionError | EstadoPeticionOk = {
        ok: true,
        mensaje: "",
      };
      const disponibilidad = get().disponibilidad;

      if (typeof disponibilidad.id !== "string") {
        await axios
          .delete(`/api/disponibilidades/${disponibilidad.id}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error.message));
      }

      return estado;
    },
  })
);
