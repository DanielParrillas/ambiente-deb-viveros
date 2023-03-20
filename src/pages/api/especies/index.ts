import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/server/prisma";
import { defaultQuery, simpleQuery } from "@/prisma/queries/especiesQueries";

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
