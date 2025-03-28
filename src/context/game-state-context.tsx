"use client";

import React from "react";
import { setCookie } from "cookies-next/client";
import { createGameState } from "./game-state";
import { useSelector } from "@xstate/store/react";
import { formatScore } from "~/utils/number";
import type { GameState } from "~/types/gameState";

const LS_KEY = "gameState";

const GameStateContext = React.createContext<ReturnType<
  typeof createGameState
> | null>(null);

const GameStateProvider = ({ children }: { children: React.ReactNode }) => {
  // Store is created once per Provider usage
  const [gameStateStore] = React.useState(createGameState);

  /**
   * We restore gameState inside this useEffect to avoid hydration errors.
   * In restoring inside a useEffect, we allow the initial render to occur
   * without any mismatch errors (server doesn't have the localStorage contents).
   * After we perform this initial render, we grab the localStorage contents
   * and restore whatever saved state is found there.
   */
  React.useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const savedState = JSON.parse(localStorage?.getItem(LS_KEY) ?? "{}") as
        | GameState
        | undefined;
      if (savedState) {
        savedState.initialSource = "loaded";
        gameStateStore.send({
          type: "RESTORE",
          savedState,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  gameStateStore.subscribe((state) => {
    localStorage.setItem(LS_KEY, JSON.stringify(state.context));
    setCookie("gameStage", state.context.gameStage);
  });

  return (
    <GameStateContext.Provider value={gameStateStore}>
      {children}
    </GameStateContext.Provider>
  );
};

// Hook to access Context that indirectly exposes the created store
const useGameStateStore = () => {
  const ctx = React.useContext(GameStateContext);

  if (!ctx)
    throw Error(`useGameStateStore must be used within a GameStateProvider`);

  return ctx;
};

const useGameState = () => {
  const store = useGameStateStore();
  return useSelector(store, (state) => state.context);
};

const usePlayers = () => {
  const store = useGameStateStore();
  return useSelector(store, (state) => state.context.players);
};

const useCurrentPlayer = () => {
  const store = useGameStateStore();
  const currentPlayer = useSelector(store, (state) => {
    const currentPlayerId = state.context.currentPlayerId;
    const currentPlayer = state.context.players.find(
      (p) => p.id === currentPlayerId,
    );
    return currentPlayer;
  });
  return currentPlayer;
};

const usePlayerRanking = (playerId?: string) => {
  const store = useGameStateStore();
  const rankings = useSelector(store, (state) => state.context.rankings);
  if (!playerId || rankings.length === 0) return "-";
  const currentPlayerRankingIndex = rankings.findIndex(
    (rankedPlayerId) => rankedPlayerId === playerId,
  );
  return currentPlayerRankingIndex + 1;
};

const usePlayerRankings = () => {
  const store = useGameStateStore();
  const { players, rankings } = useSelector(store, (state) => state.context);
  const rankedPlayers = rankings.map((playerId) => {
    return players.find((p) => p.id === playerId);
  });
  return rankedPlayers;
};

const useTurnHistory = () => {
  const store = useGameStateStore();
  return useSelector(store, (state) => state.context.turnHistory);
};

const useTurnHistoryForPlayer = (playerId?: string) => {
  const store = useGameStateStore();
  const turnHistory = useSelector(store, (state) => state.context.turnHistory);
  if (!playerId) return [];
  const playersTurnHistory = turnHistory.filter(
    (turnEntry) => turnEntry.playerId === playerId,
  );
  return playersTurnHistory;
};

const useGameStage = () => {
  const store = useGameStateStore();
  return useSelector(store, (state) => state.context.gameStage);
};

const useOnDeckPlayers = () => {
  const store = useGameStateStore();
  const { players, turnOrder, currentPlayerId } = useSelector(
    store,
    (state) => state.context,
  );
  const turnOrderIndex = turnOrder.findIndex(
    (playerId) => playerId === currentPlayerId,
  );
  const onDeckPlayerIds = turnOrder
    .slice(turnOrderIndex)
    .concat(turnOrder.slice(0, turnOrderIndex))
    .slice(1);
  const onDeckPlayers = onDeckPlayerIds.map((playerId) =>
    players.find((p) => p.id === playerId),
  );
  return onDeckPlayers;
};

const useFirstPlacePlayer = () => {
  const store = useGameStateStore();
  return useSelector(store, (state) => {
    const rankings = state.context.rankings;
    const firstPlacePlayer = state.context.players.find(
      (p) => p.id === rankings[0],
    );
    return firstPlacePlayer;
  });
};

/**
 * Returns a list of turns formatted to human readable strings
 * @param limit the max amount of turns to be returned
 */
const useFormattedTurns = (limit: number) => {
  // The existence of a for loop in this function trips
  // makes eslint believe these hooks might be called in a
  // loop. So we disable this rule since this isn't the case.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const store = useGameStateStore();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { players, turnHistory } = useSelector(store, (state) => state.context);
  const playerMap = new Map(players.map((player) => [player.id, player]));
  const lastTurns = turnHistory.slice(-limit);
  const formattedTurns: string[] = [];
  // we might be asked to return quite a few turns so we use
  // a traditional for loop for the sake of speed
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < lastTurns.length; i++) {
    const player = playerMap.get(lastTurns[i]?.playerId ?? "");
    if (lastTurns[i]?.gotOnBoardThisTurn) {
      formattedTurns.unshift(`${player?.name} got on the board.`);
    } else if ((lastTurns[i]?.earned ?? 0) > 0) {
      formattedTurns.unshift(
        `${player?.name} earned ${formatScore(lastTurns[i]?.earned ?? 0)} points.`,
      );
    } else if (
      lastTurns[i]?.earned === 0 &&
      (lastTurns[i]?.newTotal ?? 0) > 0
    ) {
      formattedTurns.unshift(`${player?.name} earned no points.`);
    } else {
      formattedTurns.unshift(`${player?.name} did not get on the board.`);
    }
  }
  return formattedTurns;
};

export {
  GameStateProvider,
  useGameStateStore,
  useGameState,
  usePlayers,
  useCurrentPlayer,
  useGameStage,
  useTurnHistory,
  useTurnHistoryForPlayer,
  usePlayerRanking,
  usePlayerRankings,
  useOnDeckPlayers,
  useFirstPlacePlayer,
  useFormattedTurns,
};
