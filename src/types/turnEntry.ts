import z from "zod";

export const zTurnEntry = z.object({
  playerId: z.string().nonempty(),
  earned: z.number(),
  newTotal: z.number(),
  gotOnBoardThisTurn: z.boolean(),
});

export type TurnEntry = z.infer<typeof zTurnEntry>;
