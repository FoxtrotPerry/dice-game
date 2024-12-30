import type { playerColor } from "./playerColor";

export type Player = {
  name: string;
  id: string;
  score: number;
  color: (typeof playerColor)[keyof typeof playerColor];
  onTheBoard: boolean;
};
