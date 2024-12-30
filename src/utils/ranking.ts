import { Player } from "~/types/player";
import { comparePlayerScore } from "./array";

export const getRankings = (players: Player[]) => {
  return players.toSorted(comparePlayerScore).map((player) => player.id);
};
