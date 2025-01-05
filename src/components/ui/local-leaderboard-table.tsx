"use client";

import { useGameState } from "~/context/game-state-context";
import LeaderboardTable from "./leaderboard-table";
import { gameStateToSavedGame } from "~/utils/analytics";

export default function LocalLeaderboardTable({
  className,
}: {
  className?: string;
}) {
  const gameState = useGameState();
  const localSavedGame = gameStateToSavedGame({
    gameState,
    userId: "",
  });
  return (
    <LeaderboardTable players={localSavedGame.players} className={className} />
  );
}
