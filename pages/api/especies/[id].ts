import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getEspecie(req, res);
  }
}

const getEspecie = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    console.log(id);

    const especie = await prisma.viveroEspecie.findUnique({
      where: { id: parseInt(id as string) },
      select: {
        id: true,
        comun: true,
        cientifico: true,
        tipo: true,
        estado: true,
        categoria: true,
      },
    });
    res.json(especie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en la api de especie" });
  }
};
