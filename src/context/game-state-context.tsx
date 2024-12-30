"use client";

import React from "react";
import { setCookie } from "cookies-next/client";
import { createGameState, type GameState } from "./game-state";
import { useSelector } from "@xstate/store/react";

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
        gameStateStore.send({ type: "RESTORE", savedState });
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
const useGameState = () => {
  const ctx = React.useContext(GameStateContext);

  if (!ctx) throw Error(`useGameState must be used within a GameStateProvider`);

  return ctx;
};

const usePlayers = () => {
  const store = useGameState();
  return useSelector(store, (state) => state.context.players);
};

const useCurrentPlayer = () => {
  const store = useGameState();
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
  const store = useGameState();
  const rankings = useSelector(store, (state) => state.context.rankings);
  if (!playerId || rankings.length === 0) return "-";
  const currentPlayerRankingIndex = rankings.findIndex(
    (rankedPlayerId) => rankedPlayerId === playerId,
  );
  return currentPlayerRankingIndex + 1;
};

const useTurnHistory = () => {
  const store = useGameState();
  return useSelector(store, (state) => state.context.turnHistory);
};

const useGameStage = () => {
  const store = useGameState();
  return useSelector(store, (state) => state.context.gameStage);
};

const useOnDeckPlayers = () => {
  const store = useGameState();
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
  const store = useGameState();
  return useSelector(store, (state) => {
    const rankings = state.context.rankings;
    const firstPlacePlayer = state.context.players.find(
      (p) => p.id === rankings[0],
    );
    return firstPlacePlayer;
  });
};

export {
  GameStateProvider,
  useGameState,
  usePlayers,
  useCurrentPlayer,
  useGameStage,
  useTurnHistory,
  usePlayerRanking,
  useOnDeckPlayers,
  useFirstPlacePlayer,
};
