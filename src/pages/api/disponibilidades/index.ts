import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/server/prisma";
import {
  defaultQuery,
  queryDeUnVivero,
  queryPorEspecie,
  queryPorVivero,
} from "@/prisma/queries/disponibilidadesQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      switch (req.query.por) {
        case "vivero":
          return await getDisponibilidadesPorVivero(req, res);
        case "especie":
          return await getDisponibilidadesPorEspecie(req, res);
        default:
          return await getDisponibilidades(req, res);
      }
    case "POST":
      return await saveDisponibilidad(req, res);
  }
}

const saveDisponibilidad = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const newDisponibilidad = req.body;
    await prisma.viveroDisponibilidadEspecies.create({
      data: { ...newDisponibilidad },
      select: { ...queryDeUnVivero.select },
    });

    console.log("creating a new disponibilidad");
    console.log(newDisponibilidad);

    return res.status(200).json(newDisponibilidad);
  } catch (error) {
    let errorMessage = "Error en la api para guardar disponibilidades";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ message: errorMessage });
  }
};

const getDisponibilidades = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    console.log("obteniendo disponibilidades...");

    const disponibilidades = await prisma.viveroDisponibilidadEspecies.findMany(
      defaultQuery
    );
    console.log("disponibilidades obtenidas");
    res.json(disponibilidades);
  } catch (error) {
    let errorMessage = "Error en la api de disponibilidades default";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ message: errorMessage });
  }
};

const getDisponibilidadesPorVivero = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const disponibilidades = await prisma.vivero.findMany({
      select: queryPorVivero.select,
      orderBy: [{ nombre: "asc" }],
    });
    res.json(disponibilidades);
  } catch (error) {
    let errorMessage =
      "Error en la api para obtener disponibilidades por vivero";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ message: errorMessage });
  }
};

const getDisponibilidadesPorEspecie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const disponibilidades = await prisma.viveroEspecie.findMany(
      queryPorEspecie
    );
    res.json(disponibilidades);
  } catch (error) {
    let errorMessage =
      "Error en la api para obtener disponibilidades por especie";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ message: errorMessage });
  }
};
