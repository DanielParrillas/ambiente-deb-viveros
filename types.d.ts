import { ViveroDisponibilidadEspecies } from "@prisma/client";

interface Disponibilidad
  extends Omit<ViveroDisponibilidadEspecies, "viveroId" | "especieId"> {}

export interface DisponibilidadPOST {
  especieId: number;
  viveroId: number;
  fecha: string;
  enProceso: number;
  disponibles: number;
}

export interface DisponibilidadPUT extends disponibilidadPOST {
  id: number;
}

export interface EstadoPeticionError {
  ok: false;
  error: Error;
}
export interface EstadoPeticionOk {
  ok: true;
}
