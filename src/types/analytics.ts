import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

export type SavedGameResponse =
  inferRouterOutputs<AppRouter>["game"]["getGame"]["game"];
