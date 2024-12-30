import type { Player } from "~/types/player";
import { comparePlayerScore } from "./array";
import { medalColors } from "~/types/medalColors";

export const getRankings = (players: Player[]) => {
  return players.toSorted(comparePlayerScore).map((player) => player.id);
};

export const getRankColor = (rank: number | string) => {
  switch (rank) {
    case 1:
      return medalColors.GOLD;
    case 2:
      return medalColors.SILVER;
    case 3:
      return medalColors.BRONZE;
    default:
      return medalColors.DNP;
  }
};
