import { playerColor } from "./playerColor";
import type { TurnEntry } from "./turnEntry";

export type Player = {
  name: string;
  id: string;
  score: number;
  scoreHistory: TurnEntry[];
  place?: number;
  color: (typeof playerColor)[keyof typeof playerColor];
  onTheBoard: boolean;
  isPlayersTurn: boolean;
};
