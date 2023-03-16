import { Prisma } from "@prisma/client";

export const defaultQuery = Prisma.validator<Prisma.ViveroSolicitudArgs>()({
  select: {
    id: true,
    nombreDelSolicitante: true,
    apellidoDelSolicitante: true,
    institucionSolicitante: true,
    fechaDeSolicitud: true,
    estado: { select: { nombre: true } },
    notas: true,
    detalles: { select: { cantidad: true } },
  },
});
export interface SolicitudDefaultInterface
  extends Prisma.ViveroSolicitudGetPayload<typeof defaultQuery> {}

export const completeQuery = Prisma.validator<Prisma.ViveroSolicitudArgs>()({});
export interface SolicitudCompleteInterface
  extends Prisma.ViveroSolicitudGetPayload<typeof completeQuery> {}
