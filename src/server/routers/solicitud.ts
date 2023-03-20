import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";

const defaultSolicitudSelect = Prisma.validator<Prisma.ViveroSolicitudSelect>()(
  {
    id: true,
    nombreDelSolicitante: true,
    apellidoDelSolicitante: true,
    institucionSolicitante: true,
    fechaDeSolicitud: true,
    notas: true,
    estado: true,
  }
);

export const solicitudRouter = router({
  lista: procedure.query(async ({ input }) => {
    const solicitudes = await prisma.viveroSolicitud.findMany({
      select: defaultSolicitudSelect,
    });

    return { lista: solicitudes };
  }),
});
