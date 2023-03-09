import { Prisma } from "@prisma/client";

export const defaultQuery = Prisma.validator<Prisma.ViveroEspecieArgs>()({
  select: {
    id: true,
    comun: true,
    cientifico: true,
    categoria: true,
    estado: true,
    tipo: true,
  },
});
export interface EspecieDefaultInterface
  extends Prisma.ViveroEspecieGetPayload<typeof defaultQuery> {}

export const simpleQuery = Prisma.validator<Prisma.ViveroEspecieArgs>()({
  select: {
    id: true,
    comun: true,
    cientifico: true,
  },
});
export interface EspecieSimpleInterface
  extends Prisma.ViveroEspecieGetPayload<typeof simpleQuery> {}
