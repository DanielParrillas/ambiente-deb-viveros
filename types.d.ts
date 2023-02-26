import { ViveroDisponibilidadEspecies } from "@prisma/client";

interface Disponibilidad
  extends Omit<ViveroDisponibilidadEspecies, "viveroId" | "especieId"> {}
