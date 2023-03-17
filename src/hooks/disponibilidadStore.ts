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
import {
  deleteDisponibilidad,
  postDisponibilidad,
  putDisponibilidad,
} from "@/src/services/disponibilidad";

interface DisponibilidadForm {
  visible: boolean;
  deshabilitado: boolean;
}

const initialDisponibilidadForm: DisponibilidadForm = {
  visible: true,
  deshabilitado: false,
};

interface DisponibilidadStore {
  id: "" | number;
  fecha: "" | string | Date | Dayjs;
  disponibles: "" | number;
  enProceso: "" | number;
  especie: EspecieSimpleInterface | "";
  vivero: ViveroSimpleInterface | "";
}
const initialDisponibilidad: DisponibilidadStore = {
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
  disponibilidadForm: DisponibilidadForm;
  setDisponibilidadForm: (data: DisponibilidadForm) => void;
  limpiarDisponibilidad: (mantener: "vivero" | "especie" | "nada") => void;
  setDisponibilidad: (data: DisponibilidadStore) => void;
  guardarDisponibilidad: () => Promise<EstadoPeticionError | EstadoPeticionOk>;
  setDisponibilidadDeunVivero: (
    data: DispiniblidadesDeUnViveroInterface[]
  ) => void;
  getDisponibilidadesDeunVivero: (
    viveroId: string | string[]
  ) => Promise<EstadoPeticionError | EstadoPeticionOk>;
  borrarDisponibilidad: () => Promise<EstadoPeticionError | EstadoPeticionOk>;
}

export const useDisponibilidadStore = create<DisponibilidadState>()(
  (set, get) => ({
    disponibilidad: initialDisponibilidad,
    disponibilidadForm: initialDisponibilidadForm,
    setDisponibilidadForm: (data) =>
      set((state) => ({ disponibilidadForm: { ...data } })),
    disponibilidadesDeUnVivero: [],
    limpiarDisponibilidad: (mantener) => {
      switch (mantener) {
        case "especie":
          set((state) => ({
            disponibilidad: {
              ...initialDisponibilidad,
              especie: state.disponibilidad.especie,
            },
          }));
          break;
        case "vivero":
          set((state) => ({
            disponibilidad: {
              ...initialDisponibilidad,
              vivero: state.disponibilidad.vivero,
            },
          }));
          break;

        case "nada":
          set((state) => ({ disponibilidad: initialDisponibilidad }));
          break;
      }
      set((state) => ({
        disponibilidadForm: { deshabilitado: false, visible: true },
      }));
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
          fecha: dayjs(disponibilidad.fecha)
            .utc(false)
            .format("YYYY-MM-DDTHH:mm:ssZ"),
          especieId: disponibilidad.especie.id,
          viveroId: disponibilidad.vivero.id,
        };
        if (disponibilidad.id === "") {
          return postDisponibilidad(data);
        } else {
          return putDisponibilidad(disponibilidad.id, data);
        }
      } else {
        return {
          ok: false,
          error: new Error("Los datos de la disponibilidad son incompatibles"),
        };
      }
    },
    borrarDisponibilidad: async () => {
      const disponibilidad = get().disponibilidad;
      return deleteDisponibilidad(disponibilidad.id);
    },
  })
);
