import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";

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
    const disponibilidades = await prisma.viveroDisponibilidadEspecies.findMany(
      {
        select: {
          id: true,
          vivero: {
            select: {
              id: true,
              nombre: true,
            },
          },
          especie: {
            select: {
              id: true,
              cientifico: true,
              comun: true,
            },
          },
          disponibles: true,
          enProceso: true,
          fecha: true,
        },
      }
    );
    res.json(disponibilidades);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en la api de disponibilidades" });
  }
};
