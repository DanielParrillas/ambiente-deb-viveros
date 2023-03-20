import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/server/prisma";
import {
  defaultQuery,
  completeQuery,
} from "@/prisma/queries/solicitudesQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      console.log(`obteniendo solicitudes de tipo ${req.query.tipo}...`);

      switch (req.query.tipo) {
        case "simple":
          break;
        case "completo":
          return await getSolicitudes(req, res, completeQuery);
        default:
          return await getSolicitudes(req, res, defaultQuery);
      }
      break;

    default:
      break;
  }
}

const getSolicitudes = async (
  req: NextApiRequest,
  res: NextApiResponse,
  query: typeof defaultQuery | typeof completeQuery
) => {
  const solicitudes = await prisma.viveroSolicitud.findMany(query);
  console.log("solicitudes obtenidas");

  res.json(solicitudes);
  try {
  } catch (error) {
    let errorMessage = "Error en la api para obtener solicitudes";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ message: errorMessage });
  }
};
