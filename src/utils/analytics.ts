import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

type GetGameReturn = inferRouterOutputs<AppRouter>["game"]["getGame"];

export const getHighestTurnAnalytics = async (data: GetGameReturn) => {
  if (data === undefined) return;
  const { turns, players } = data;
  let highestTurn = turns[0];
  turns.forEach((turn) => {
    if (turn.earned > (highestTurn?.earned ?? 0)) {
      highestTurn = turn;
    }
  });
  const highestTurnPlayer = players.find((player) => {
    return player.id === highestTurn?.playerId;
  });
  return { highestTurnPlayer, highestTurn };
};
