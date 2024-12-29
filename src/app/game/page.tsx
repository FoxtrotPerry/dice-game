"use client";

import { useCurrentPlayer, usePlayers } from "~/context/game-state-context";

export default function Game() {
  const players = usePlayers();
  const currentPlayer = useCurrentPlayer();

  return (
    <main className="flex flex-col justify-center">
      <div className="flex gap-1">
        <div></div>
      </div>
    </main>
  );
}
