import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

//Creamos un variable que almacena la consulta
const query = Prisma.validator<Prisma.ViveroDisponibilidadEspeciesArgs>()({
  select: {
    id: true,
    disponibles: true,
    enProceso: true,
    fecha: true,
    especie: {
      select: {
        id: true,
        comun: true,
        cientifico: true,
      },
    },
  },
});
//Se crea un tipo a partir de la consulta
type QueryType = Prisma.ViveroDisponibilidadEspeciesGetPayload<typeof query>;
//Se exporta para que pueda ser utilizada por el fronted
export interface DispiniblidadPorViveroInterface extends QueryType {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getDisponibilidadesPorVivero(req, res);
  }
}

const getDisponibilidadesPorVivero = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const disponibilidades = await prisma.viveroDisponibilidadEspecies.findMany(
      {
        where: {
          viveroId: parseInt(id as string),
        },
        select: { ...query.select },
      }
    );

    return res.json(disponibilidades);
  } catch (error) {
    console.log(error);
    console.log("error en la api de disponibilidad por vivero");
    return res
      .status(500)
      .json({ message: "error en la api de disponibilidad por vivero" });
  }
};
