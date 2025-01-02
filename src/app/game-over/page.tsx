"use client";

import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import LeaderboardTable from "~/components/ui/leaderboard-table";
import { useGameState } from "~/context/game-state-context";

export default function GameOver() {
  const gameState = useGameState();

  const handlePlayAgainClick = () => {
    gameState.send({ type: "playAgain" });
    redirect("/first-roll");
  };

  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-screen-sm flex-col gap-2 p-3">
        <h1 className="w-full text-center text-4xl font-bold">
          <i>GAME OVER</i>
        </h1>
        <LeaderboardTable />
        <Button onClick={handlePlayAgainClick}>Play Again?</Button>
      </section>
    </main>
  );
}
