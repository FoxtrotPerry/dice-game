"use client";

import { api } from "~/trpc/react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import LeaderboardTable from "~/components/ui/leaderboard-table";
import { useGameState, useGameStateStore } from "~/context/game-state-context";
import { Loader2 } from "lucide-react";

export default function GameOver() {
  const user = useUser();
  const gameStateStore = useGameStateStore();
  const gameState = useGameState();
  const utils = api.useUtils();

  const handlePlayAgainClick = () => {
    gameStateStore.send({ type: "playAgain" });
    redirect("/first-roll");
  };

  const gameAlreadySaved = api.game.gameExists.useQuery(gameState.id, {
    refetchOnWindowFocus: false,
    enabled: !!user.user,
  });
  const saveGame = api.game.saveGame.useMutation({
    onSuccess: async (results) => {
      console.log(results);
      await utils.game.invalidate();
    },
  });

  const handleSaveGameClick = async () => {
    if (gameState && user?.user?.id) {
      saveGame.mutate({ gameState, accountId: user.user.id });
    }
  };

  const pending = saveGame.isPending || gameAlreadySaved.isPending;

  const disableSaving =
    pending || gameAlreadySaved.data === true || !user.isSignedIn;

  const saveButtonText = disableSaving ? "Game already saved!" : "Save Game";

  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-screen-sm flex-col gap-2 p-3">
        <h1 className="w-full text-center text-4xl font-bold">
          <i>GAME OVER</i>
        </h1>
        <LeaderboardTable />
        <Button onClick={handlePlayAgainClick}>Play Again?</Button>
        <Button onClick={handleSaveGameClick} disabled={disableSaving}>
          {pending && <Loader2 className="animate-spin" />}
          {saveButtonText}
        </Button>
      </section>
    </main>
  );
}
