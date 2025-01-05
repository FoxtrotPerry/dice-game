import { useQuery } from "@tanstack/react-query";
import { type GetGameResponseGameData } from "~/types/analytics";
import type { GameState } from "~/types/gameState";
import {
  gameStateToSavedGame,
  getFirstPlayerToStealFirst,
  getHighestTurnAnalytics,
  getHighLowVariance,
  getMostNoScoreTurns,
  getUnderDog,
} from "~/utils/analytics";

type UserAnalyticsParams =
  | { source: "gameSave"; savedGame: GetGameResponseGameData }
  | { source: "localState"; gameState: GameState };

// TODO: Rename to useAwards

export function useAnalytics(params: UserAnalyticsParams) {
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

function isUseAnalyticsEnabled(params: UserAnalyticsParams) {
  switch (params.source) {
    case "gameSave":
      return true;
    case "localState":
      return params.gameState.initialSource !== "initial";
  }
}
