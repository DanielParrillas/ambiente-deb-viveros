import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { solicitudRouter } from "./solicitud";

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  solicitud: solicitudRouter,
});

//exporta los types de la api
export type AppRouter = typeof appRouter;
