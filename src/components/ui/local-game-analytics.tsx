"use client";

import { useGameState } from "~/context/game-state-context";
import GameAnalytics from "./game-analytics";
import { gameStateToSavedGame } from "~/utils/analytics";

export default function LocalGameAnalytics({}) {
  const gameState = useGameState();
  const localGameSave = gameStateToSavedGame({ gameState, userId: "" });

  return (
    <div>
      <GameAnalytics players={localGameSave.players} />
    </div>
  );
}
