import { ViveroDisponibilidadEspecies } from "@prisma/client";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./src/server/routers/_app";

export interface GeneralDataSimple {
  id: number;
  nombre: string;
}

export interface MunicipioSimple extends GeneralDataSimple {
  departamento: GeneralDataSimple;
}

export interface EspecieSimple {
  id: number;
  comun: string;
  cientifico: string;
}

interface Disponibilidad
  extends Omit<ViveroDisponibilidadEspecies, "viveroId" | "especieId"> {}

export interface DisponibilidadPOST {
  especieId: number;
  viveroId: number;
  fecha: string;
  enProceso: number;
  disponibles: number;
}

export interface DisponibilidadPUT extends disponibilidadPOST {}

export interface EstadoPeticionError {
  ok: false;
  error: Error;
}
export interface EstadoPeticionOk {
  ok: true;
  mensaje: string;
}
