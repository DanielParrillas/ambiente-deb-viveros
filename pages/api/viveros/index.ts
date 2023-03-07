import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

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
        departamento: { select: { id: true, nombre: true } },
      },
    },
  },
});
export interface ViveroInterface
  extends Prisma.ViveroGetPayload<typeof defaultQuery> {}

const completeQuery = Prisma.validator<Prisma.ViveroArgs>()({
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
export interface ViveroInterfaceComplete
  extends Prisma.ViveroGetPayload<typeof completeQuery> {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      switch (req.query.tipo) {
        case "simple":
          return await getViveros(req, res, defaultQuery);
        case "completo":
          return await getViveros(req, res, completeQuery);
        default:
          return await getViveros(req, res, defaultQuery);
      }
  }
}

const getViveros = async (
  req: NextApiRequest,
  res: NextApiResponse,
  query: typeof defaultQuery | typeof completeQuery
) => {
  try {
    const viveros = await prisma.vivero.findMany(query);
    res.json(viveros);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en la api de viveros" });
  }
};
