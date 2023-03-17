import { create } from "zustand";
import { SolicitudDefaultInterface } from "@/prisma/queries/solicitudesQueries";

interface SolicitudeState {
  solicitudes: SolicitudDefaultInterface[];
}

export const useSolicitudStore = create<SolicitudeState>()((set, get) => ({
  solicitudes: [],
}));
