import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

const query = Prisma.validator<Prisma.ViveroArgs>()({
  select: {
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
//Se crea un tipo a partir de la consulta
type QueryType = Prisma.ViveroGetPayload<typeof query>;
//Se exporta para que pueda ser utilizada por el fronted
export interface ViveroInterface extends QueryType {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getVivero(req, res);
  }
}

const getVivero = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    console.log(id);

    const vivero = await prisma.vivero.findUnique({
      where: { id: parseInt(id as string) },
      select: { ...query.select },
    });
    res.json(vivero);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en la api de especie" });
  }
};
