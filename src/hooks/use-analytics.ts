import { useQuery } from "@tanstack/react-query";
import { type SavedGameResponse } from "~/types/analytics";
import type { GameState } from "~/types/gameState";
import {
  gameStateToFetchedGame,
  getHighestTurnAnalytics,
} from "~/utils/analytics";

type UserAnalyticsParams =
  | { source: "gameSave"; savedGame: SavedGameResponse }
  | { source: "localState"; gameState: GameState };

export function useAnalytics(params: UserAnalyticsParams) {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const game = (() => {
        switch (params.source) {
          case "localState":
            return gameStateToFetchedGame({
              gameState: params.gameState,
              userId: "",
            });
          case "gameSave":
            return params.savedGame;
        }
      })();

      const [highestTurn] = await Promise.all([getHighestTurnAnalytics(game)]);

      return {
        highestTurn,
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

export type UseAnalyticsData = Awaited<ReturnType<typeof useAnalytics>>["data"];
