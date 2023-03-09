import { Prisma } from "@prisma/client";

//Creamos un variable que almacena la consulta

export const defaultQuery =
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

export const queryPorEspecie = Prisma.validator<Prisma.ViveroEspecieArgs>()({
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

export const queryPorVivero = Prisma.validator<Prisma.ViveroArgs>()({
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
export interface DisponibilidadesPorViveroInterface
  extends Prisma.ViveroGetPayload<typeof queryPorVivero> {}

export interface NewDisponibilidad
  extends Omit<
    Prisma.ViveroDisponibilidadEspeciesCreateInput,
    "vivero" | "especie"
  > {
  viveroId: number;
  especieId: number;
}

export interface UpdatedDisponibilidad extends NewDisponibilidad {
  id: number;
}

//Creamos un variable que almacena la consulta
export const queryDeUnVivero =
  Prisma.validator<Prisma.ViveroDisponibilidadEspeciesArgs>()({
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
type QueryType = Prisma.ViveroDisponibilidadEspeciesGetPayload<
  typeof queryDeUnVivero
>;
//Se exporta para que pueda ser utilizada por el fronted
export interface DispiniblidadesDeUnViveroInterface extends QueryType {}
