import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/server/prisma";
import { defaultQuery } from "@/prisma/queries/especiesQueries";

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
      select: { ...defaultQuery.select },
    });
    res.json(especie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en la api de especie" });
  }
};
