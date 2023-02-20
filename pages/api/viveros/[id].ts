import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";

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
    res.json(vivero);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en la api de especie" });
  }
};
