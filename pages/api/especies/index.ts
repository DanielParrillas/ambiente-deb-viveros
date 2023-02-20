import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getEspecies(req, res);
  }
}

const getEspecies = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const especies = await prisma.viveroEspecie.findMany({
      select: {
        id: true,
        comun: true,
        cientifico: true,
        categoria: true,
        estado: true,
        tipo: true,
      },
    });
    res.json(especies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en la api de especie" });
  }
};
