import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/src/server/prisma";

const defaultQuery = Prisma.validator<Prisma.ViveroArgs>()({
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
    asignacionesPorSolicitud: {},
  },
});
export interface ViveroInterface
  extends Prisma.ViveroGetPayload<typeof defaultQuery> {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {}
