import { ViveroDisponibilidadEspecies } from "@prisma/client";

interface Disponibilidad
  extends Omit<ViveroDisponibilidadEspecies, "viveroId" | "especieId"> {}

export interface disponibilidadPOST {
  especieId: number;
  viveroId: number;
  fecha: string;
  enProceso: number;
  disponibles: number;
}

export interface disponibilidadPUT extends disponibilidadPOST {
  id: number;
}
