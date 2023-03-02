import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

//Creamos un variable que almacena la consulta
const query = Prisma.validator<Prisma.ViveroArgs>()({
  select: {
    id: true,
    nombre: true,
    disponibilidadesPorEspecie: {
      select: {
        disponibles: true,
        enProceso: true,
      },
    },
  },
});
type QueryType = Prisma.ViveroGetPayload<typeof query>;
export interface ViveroDisponibilidadInterface extends QueryType {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getDisponibilidades(req, res);
  }
}

const getDisponibilidades = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const disponibilidades = await prisma.vivero.findMany(query);
    res.json(disponibilidades);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error en la api de disponibilidades por vivero" });
  }
};
