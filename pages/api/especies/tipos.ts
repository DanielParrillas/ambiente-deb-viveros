import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getTipos(req, res);
  }
}

const getTipos = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tipos = await prisma.viveroEspecieTipo.findMany({});
    res.json(tipos);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error en la api de tipos de especie" });
  }
};
