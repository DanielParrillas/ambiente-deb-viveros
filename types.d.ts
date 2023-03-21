import { ViveroDisponibilidadEspecies } from "@prisma/client";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./src/server/routers/_app";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOuput = inferRouterOutputs<AppRouter>;

export type SolicitudListaInput = RouterInput["solicitud"]["lista"];
export type SolicitudListaOuput = RouterInput["solicitud"]["lista"];

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
