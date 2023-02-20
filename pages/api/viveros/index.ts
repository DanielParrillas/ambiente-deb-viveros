import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getViveros(req, res);
  }
}

const getViveros = async (req: NextApiRequest, res: NextApiResponse) => {
  const viveros = await prisma.vivero.findMany({
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
  res.json(viveros);
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en la api de viveros" });
  }
};
