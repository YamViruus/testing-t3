import { router } from "../trpc";
import { authRouter } from "./auth";
import { clientRouter } from "./client.router";
import { fournisseurRouter } from "./fournisseur.router";

export const appRouter = router({
  fournisseur: fournisseurRouter,
  client: clientRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
