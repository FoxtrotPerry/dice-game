import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { games } from "~/server/db/schema";

export const gameRouter = createTRPCRouter({
  // saveGame: publicProcedure.input()
});
