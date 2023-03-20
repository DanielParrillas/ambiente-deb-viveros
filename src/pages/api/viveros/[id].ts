import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/server/prisma";
import { defaultQuery } from "@/prisma/queries/viverosQueries";

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
      select: { ...defaultQuery.select },
    });
    res.json(vivero);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en la api de especie" });
  }
};
