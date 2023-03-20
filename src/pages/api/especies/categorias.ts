import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/server/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getCategorias(req, res);
  }
}

const getCategorias = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categorias = await prisma.viveroEspecieCategoria.findMany({});
    res.json(categorias);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error en la api de categorias de especie" });
  }
};
