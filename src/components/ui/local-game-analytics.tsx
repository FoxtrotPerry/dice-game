"use client";

import { useGameState } from "~/context/game-state-context";
import { useAnalytics } from "~/hooks/use-analytics";
import GameAnalytics from "./game-analytics";

export default function LocalGameAnalytics({}) {
  const gameState = useGameState();
  const analytics = useAnalytics({
    source: "localState",
    gameState: gameState,
  });

  return (
    <div>
      <GameAnalytics analytics={analytics.data} />
    </div>
  );
}
