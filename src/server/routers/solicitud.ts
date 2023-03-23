import { z } from "zod";
import { publicProcedure, router } from "../trpc";
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
const completeSolicitudSelect =
  Prisma.validator<Prisma.ViveroSolicitudSelect>()({
    id: true,
    nombreDelSolicitante: true,
    apellidoDelSolicitante: true,
    institucionSolicitante: true,
    fechaDeSolicitud: true,
    lugarAReforestar: true,
    correoDelSolicitante: true,
    telefonoDelSolicitante: true,
    celularDelSolicitante: true,
    notas: true,
    estado: { select: { id: true, nombre: true } },
    municipio: {
      select: {
        id: true,
        nombre: true,
        departamento: { select: { id: true, nombre: true } },
      },
    },
    detalles: {
      select: {
        id: true,
        cantidad: true,
        especie: { select: { id: true, comun: true, cientifico: true } },
      },
    },
    asignaciones: {
      select: {
        id: true,
        actualizado: true,
        vivero: { select: { id: true, nombre: true } },
        detalles: { select: {} },
      },
    },
  });

export const solicitudRouter = router({
  lista: publicProcedure.input(z.void()).query(async ({ input }) => {
    const solicitudes = await prisma.viveroSolicitud.findMany({
      select: defaultSolicitudSelect,
      orderBy: [{ fechaDeSolicitud: "desc" }],
    });

    const totalDetalle = await prisma.viveroSolicitudDetalle.groupBy({
      by: ["solicitudId"],
      _sum: { cantidad: true },
    });

    return { lista: solicitudes, total: totalDetalle };
  }),
  porId: publicProcedure.input(z.number()).query(async ({ input }) => {
    const solicitud = await prisma.viveroSolicitud.findUnique({
      where: { id: input },
    });

    return { solicitud };
  }),
});
