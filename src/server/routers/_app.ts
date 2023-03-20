import { z } from "zod";
import { procedure, router } from "../trpc";
import { solicitudRouter } from "./solicitud";

export const appRouter = router({
  hello: procedure
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

//exporta el type de la api
export type AppRouter = typeof appRouter;
