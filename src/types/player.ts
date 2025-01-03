import { z } from "zod";
import { playerColors } from "./playerColor";

export const zPlayer = z.object({
  name: z.string(),
  id: z.string().cuid2(),
  score: z.number(),
  color: z.enum(playerColors),
  onTheBoard: z.boolean(),
});

export type Player = z.infer<typeof zPlayer>;
