import { Player } from "~/types/player";

export const comparePlayerScore = (p1: Player, p2: Player) => {
  return p2.score - p1.score;
};
