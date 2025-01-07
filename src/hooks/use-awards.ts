import { useQuery } from "@tanstack/react-query";
import { type GetGameResponseGameData } from "~/types/awards";
import type { GameState } from "~/types/gameState";
import {
  gameStateToSavedGame,
  getFirstPlayerToStealFirst,
  getHighestTurnAnalytics,
  getHighLowVariance,
  getMostNoScoreTurns,
  getUnderDog,
} from "~/utils/awards";

type UserAwardsParams =
  | { source: "gameSave"; savedGame: GetGameResponseGameData }
  | { source: "localState"; gameState: GameState };

export function useAwards(params: UserAwardsParams) {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const game = (() => {
        switch (params.source) {
          case "localState":
            return gameStateToSavedGame({
              gameState: params.gameState,
              userId: "",
            });
          case "gameSave":
            return params.savedGame;
        }
      })();

      const [
        highestTurn,
        mostNoScores,
        firstToSteal,
        underDog,
        highLowVariance,
      ] = await Promise.all([
        getHighestTurnAnalytics(game),
        getMostNoScoreTurns(game),
        getFirstPlayerToStealFirst(game),
        getUnderDog(game),
        getHighLowVariance(game),
      ]);

      return {
        highestTurn,
        mostNoScores,
        firstToSteal,
        underDog,
        highLowVariance,
      };
    },
    enabled: isUseAnalyticsEnabled(params),
  });
}

function isUseAnalyticsEnabled(params: UserAwardsParams) {
  switch (params.source) {
    case "gameSave":
      return true;
    case "localState":
      return params.gameState.initialSource !== "initial";
  }
}
