import { Prisma } from "@prisma/client";

export const defaultQuery = Prisma.validator<Prisma.ViveroArgs>()({
  select: {
    id: true,
    nombre: true,
    meta: true,
    estaActivo: true,
    latitud: true,
    longitud: true,
    direccion: true,
    municipio: {
      select: {
        id: true,
        nombre: true,
        departamento: { select: { id: true, nombre: true } },
      },
    },
  },
});
export interface ViveroInterface
  extends Prisma.ViveroGetPayload<typeof defaultQuery> {}

export const simpleQuery = Prisma.validator<Prisma.ViveroArgs>()({
  select: {
    id: true,
    nombre: true,
  },
});
export interface ViveroSimpleInterface
  extends Prisma.ViveroGetPayload<typeof simpleQuery> {}

export const completeQuery = Prisma.validator<Prisma.ViveroArgs>()({
  select: {
    id: true,
    nombre: true,
    meta: true,
    estaActivo: true,
    latitud: true,
    longitud: true,
    direccion: true,
    municipio: {
      select: {
        id: true,
        nombre: true,
        longitud: true,
        latitud: true,
        departamento: {
          select: { id: true, nombre: true, longitud: true, latitud: true },
        },
      },
    },
    disponibilidadesPorEspecie: {
      select: {
        id: true,
        disponibles: true,
        enProceso: true,
        fecha: true,
        especie: {
          select: {
            id: true,
            comun: true,
            cientifico: true,
          },
        },
      },
    },
    asignacionesPorSolicitud: {
      select: {
        id: true,
      },
    },
  },
});
export interface ViveroCompleteInterface
  extends Prisma.ViveroGetPayload<typeof completeQuery> {}
