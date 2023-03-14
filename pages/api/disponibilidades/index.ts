import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
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
    const asdf = await prisma.viveroDisponibilidadEspecies.create({
      data: { ...newDisponibilidad },
      select: { ...queryDeUnVivero.select },
    });

    console.log("creating a new disponibilidad");
    console.log(req.body);
    console.log(asdf);

    return res.status(200).json(asdf);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en la api para guardar" });
  }
};

const getDisponibilidades = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const disponibilidades = await prisma.viveroDisponibilidadEspecies.findMany(
      defaultQuery
    );
    res.json(disponibilidades);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error en la api de disponibilidades default" });
  }
};

const getDisponibilidadesPorVivero = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const disponibilidades = await prisma.vivero.findMany(queryPorVivero);
    res.json(disponibilidades);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error en la api de disponibilidades por vivero" });
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
    console.log(error);
    res
      .status(500)
      .json({ message: "error en la api de disponibilidades por especie" });
  }
};
