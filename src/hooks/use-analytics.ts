import { useQuery } from "@tanstack/react-query";
import { type GetGameResponseGameData } from "~/types/analytics";
import type { GameState } from "~/types/gameState";
import {
  gameStateToSavedGame,
  getHighestTurnAnalytics,
  getMostNoScoreTurns,
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

      const [highestTurn, mostNoScores] = await Promise.all([
        getHighestTurnAnalytics(game),
        getMostNoScoreTurns(game),
      ]);

      return {
        highestTurn,
        mostNoScores,
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
