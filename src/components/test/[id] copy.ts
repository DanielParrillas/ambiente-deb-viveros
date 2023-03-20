import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/server/prisma";
import { queryDeUnVivero } from "@/prisma/queries/disponibilidadesQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getDisponibilidad(req, res);
    case "DELETE":
      return await deleteDisponibilidad(req, res);
    case "PUT":
      return;
    //return await updateDisponibilidad(req, res);
  }
}

const deleteDisponibilidad = (req: NextApiRequest, res: NextApiResponse) => {};
// const updateDisponibilidad = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   const disponibilidad = await prisma.viveroDisponibilidadEspecies.updateMany(
//     {}
//   );
// };

const getDisponibilidad = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const disponibilidades = await prisma.viveroDisponibilidadEspecies.findMany(
      {
        where: {
          viveroId: parseInt(id as string),
        },
        select: { ...queryDeUnVivero.select },
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
