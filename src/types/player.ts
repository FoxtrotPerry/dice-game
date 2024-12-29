import type { playerColor } from "./playerColor";
import type { TurnEntry } from "./turnEntry";

export type Player = {
  name: string;
  id: string;
  score: number;
  turnHistory: TurnEntry[];
  place?: number;
  color: (typeof playerColor)[keyof typeof playerColor];
  onTheBoard: boolean;
};
