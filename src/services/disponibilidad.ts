import axios from "axios";
import { EstadoPeticionError, EstadoPeticionOk } from "@/types";

const initialState: EstadoPeticionOk = {
  ok: true,
  mensaje: "...",
};

export const deleteDisponibilidad = async (
  disponibilidadId: string | number
): Promise<EstadoPeticionError | EstadoPeticionOk> => {
  let estado: EstadoPeticionError | EstadoPeticionOk = initialState;

  await axios
    .delete(`/api/disponibilidades/${disponibilidadId}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      estado = { ok: false, error: error };
    });

  return estado;
};

export const putDisponibilidad = async (
  disponibilidadId: number | string,
  disponibilidadData: any
): Promise<EstadoPeticionError | EstadoPeticionOk> => {
  let estado: EstadoPeticionError | EstadoPeticionOk = initialState;

  await axios
    .put(`/api/disponibilidades/${disponibilidadId}`, disponibilidadData)
    .then((response) => {
      console.log("actualizacion");
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      estado = { ok: false, error: error };
    });
  return estado;
};

export const postDisponibilidad = async (
  disponibilidad: any
): Promise<EstadoPeticionError | EstadoPeticionOk> => {
  let estado: EstadoPeticionError | EstadoPeticionOk = initialState;
  await axios
    .post(`/api/disponibilidades`, disponibilidad)
    .then((response) => {
      console.log("nuevo");
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      estado = { ok: false, error: error };
    });

  return estado;
};

export const getDisponibilidadesDeUnVivero = async () => {};
