import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { defaultQuery, completeQuery } from "@/prisma/queries/viverosQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      switch (req.query.tipo) {
        case "simple":
          return await getViveros(req, res, defaultQuery);
        case "completo":
          return await getViveros(req, res, completeQuery);
        default:
          return await getViveros(req, res, defaultQuery);
      }
  }
}

const getViveros = async (
  req: NextApiRequest,
  res: NextApiResponse,
  query: typeof defaultQuery | typeof completeQuery
) => {
  try {
    const viveros = await prisma.vivero.findMany(query);
    res.json(viveros);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en la api de viveros" });
  }
};
