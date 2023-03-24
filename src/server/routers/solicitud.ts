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
        vivero: { select: { id: true, nombre: true } },
        especie: { select: { id: true, comun: true, cientifico: true } },
      },
    },
  });

export const solicitudRouter = router({
  lista: publicProcedure.input(z.void()).query(async ({ input }) => {
    const solicitudes = await prisma.viveroSolicitud.findMany({
      select: defaultSolicitudSelect,
    });

    const totalesPorSolicitud = await prisma.viveroSolicitudDetalle.groupBy({
      by: ["solicitudId"],
      _sum: { cantidad: true },
    });

    const response = solicitudes.map((solicitud) => {
      const totalDeSolicitud = totalesPorSolicitud.find(
        (total) => solicitud.id === total.solicitudId
      );
      return { ...solicitud, cantidad: totalDeSolicitud?._sum.cantidad };
    });

    return { lista: response };
  }),
  porId: publicProcedure.input(z.number()).query(async ({ input }) => {
    const solicitud = await prisma.viveroSolicitud.findUnique({
      where: { id: input },
      select: completeSolicitudSelect,
    });

    return { solicitud: solicitud };
  }),
});
