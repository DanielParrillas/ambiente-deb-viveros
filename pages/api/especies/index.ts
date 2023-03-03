import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

const defaultQuery = Prisma.validator<Prisma.ViveroEspecieArgs>()({
  select: {
    id: true,
    comun: true,
    cientifico: true,
    categoria: true,
    estado: true,
    tipo: true,
  },
});
export interface EspecieInterfaceDefault
  extends Prisma.ViveroEspecieGetPayload<typeof defaultQuery> {}

const simpleQuery = Prisma.validator<Prisma.ViveroEspecieArgs>()({
  select: {
    id: true,
    comun: true,
    cientifico: true,
  },
});
export interface EspecieInterfaceSimple
  extends Prisma.ViveroEspecieGetPayload<typeof simpleQuery> {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      if (req.query.tipo === "simple") {
        return await getEspecies(req, res, simpleQuery);
      } else {
        return await getEspecies(req, res, defaultQuery);
      }
  }
}

const getEspecies = async (
  req: NextApiRequest,
  res: NextApiResponse,
  query: typeof defaultQuery | typeof simpleQuery
) => {
  try {
    const especies = await prisma.viveroEspecie.findMany(query);
    res.json(especies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en la api de especie" });
  }
};
