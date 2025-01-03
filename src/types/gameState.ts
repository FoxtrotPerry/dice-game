import z from "zod";
import { zTurnEntry } from "./turnEntry";
import { gameStages } from "./gameStage";
import { zPlayer } from "./player";

export const zGameState = z.object({
  id: z.string().cuid2().nonempty(),
  players: z.array(zPlayer), // TODO: Fill out
  gameStage: z.enum(gameStages).default("SETUP"),
  currentPlayerId: z.string(),
  rankings: z.array(z.string().cuid2()),
  turnOrder: z.array(z.string().cuid2()),
  turnHistory: z.array(zTurnEntry),
  firstToPassThresholdId: z.string().cuid2(),
});

export type GameState = z.infer<typeof zGameState>;
