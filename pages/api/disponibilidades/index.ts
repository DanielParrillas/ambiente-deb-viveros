import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

//Creamos un variable que almacena la consulta

const defaultQuery =
  Prisma.validator<Prisma.ViveroDisponibilidadEspeciesArgs>()({
    select: {
      id: true,
      fecha: true,
      disponibles: true,
      enProceso: true,
      vivero: {
        select: {
          id: true,
          nombre: true,
        },
      },
      especie: {
        select: {
          id: true,
          comun: true,
          cientifico: true,
        },
      },
    },
  });

const especieQuery = Prisma.validator<Prisma.ViveroEspecieArgs>()({
  select: {
    id: true,
    comun: true,
    cientifico: true,
    disponibilidades: {
      select: {
        id: true,
        fecha: true,
        disponibles: true,
        enProceso: true,
        vivero: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    },
  },
});

const viveroQuery = Prisma.validator<Prisma.ViveroArgs>()({
  select: {
    id: true,
    nombre: true,
    disponibilidadesPorEspecie: {
      select: {
        disponibles: true,
        enProceso: true,
        especie: {
          select: {
            id: true,
            comun: true,
            cientifico: true,
          },
        },
      },
    },
  },
});
export interface DisponibilidadPorViveroInterface
  extends Prisma.ViveroGetPayload<typeof viveroQuery> {}

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
    const {} = req.body;
    console.log("creating a new disponibilidad");
    console.log(req.body);
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
    const disponibilidades = await prisma.vivero.findMany(viveroQuery);
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
    const disponibilidades = await prisma.viveroEspecie.findMany(especieQuery);
    res.json(disponibilidades);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error en la api de disponibilidades por especie" });
  }
};
