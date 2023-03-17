import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { queryDeUnVivero } from "@/prisma/queries/disponibilidadesQueries";
import { DisponibilidadPUT } from "@/types";

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
      return await updateDisponibilidad(req, res);
    //return await updateDisponibilidad(req, res);
  }
}

const deleteDisponibilidad = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id: disponibilidadId } = req.query;
    await prisma.viveroDisponibilidadEspecies.delete({
      where: { id: parseInt(disponibilidadId as string) },
    });

    console.log("deleting a new disponibilidad");
    console.log(disponibilidadId);

    return res.status(200).json(`Se elimino la disponibilidad`);
  } catch (error) {
    let errorMessage = "Error en la api para eliminar disponibilidades";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ message: errorMessage });
  }
};

const updateDisponibilidad = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id: disponibilidadId } = req.query;
    const disponibilidad: DisponibilidadPUT = req.body;
    await prisma.viveroDisponibilidadEspecies.update({
      where: { id: parseInt(disponibilidadId as string) },
      data: { ...disponibilidad },
    });

    console.log("creating a new disponibilidad");
    console.log(disponibilidad);

    return res.status(200).json(disponibilidad);
  } catch (error) {
    let errorMessage = "Error en la api para guardar disponibilidades";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ message: errorMessage });
  }
};

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
