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
    const disponibilidades = await prisma.viveroEspecie.findMany({
      select: {
        id: true,
        comun: true,
        cientifico: true,
        disponibilidades: {
          select: {
            id: true,
            disponibles: true,
            enProceso: true,
            fecha: true,
            vivero: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
      },
    });
    res.json(disponibilidades);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error en la api de disponibilidades en por especie" });
  }
};
