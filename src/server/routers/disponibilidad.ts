import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";

const defaultDisponibilidadSelect =
  Prisma.validator<Prisma.ViveroDisponibilidadEspeciesSelect>()({
    id: true,
    especie: { select: { comun: true, cientifico: true } },
    vivero: { select: { nombre: true } },
  });

export const disponibilidadRouter = router({
  lista: publicProcedure.input(z.void()).query(async ({ input }) => {
    const disponibilidades = await prisma.viveroDisponibilidadEspecies.findMany(
      { select: {} }
    );
  }),
});
