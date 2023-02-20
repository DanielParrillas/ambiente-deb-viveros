import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getEstados(req, res);
  }
}

const getEstados = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const estados = await prisma.viveroEspecieEstado.findMany({});
    res.json(estados);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error en la api de estados de especie" });
  }
};
