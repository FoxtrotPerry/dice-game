"use client";

import React from "react";
import { createGameState } from "./game-state";
import { useSelector } from "@xstate/store/react";

const LS_KEY = "gameState";

const GameStateContext = React.createContext<ReturnType<
  typeof createGameState
> | null>(null);

const GameStateProvider = ({ children }: { children: React.ReactNode }) => {
  // Store is created once per Provider usage
  const [gameStateStore] = React.useState(() => {
    const previousState = JSON.parse(localStorage?.getItem(LS_KEY) ?? "{}");
    return createGameState(previousState);
  });

  gameStateStore.subscribe((state) => {
    localStorage.setItem(LS_KEY, JSON.stringify(state.context));
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

const useCount = () => {
  const store = useGameState();
  return useSelector(store, (state) => state.context.count);
};

export { GameStateProvider, useGameState, usePlayers, useCount };
