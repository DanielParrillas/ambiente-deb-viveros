import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const municipios = await prisma.municipio.findMany({
    select: { id: true, nombre: true, latitud: true, longitud: true },
  });
  res.json(municipios);
}
