"use client";

import { api } from "~/trpc/react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import LocalLeaderboardTable from "~/components/ui/local-leaderboard-table";
import { useGameState, useGameStateStore } from "~/context/game-state-context";
import { useCallback, useMemo } from "react";
import { LoadingButton } from "~/components/ui/loading-button";
import { Check, FloppyDisk } from "@phosphor-icons/react/dist/ssr";
import LocalGameAnalytics from "~/components/ui/local-game-analytics";
import { gameStateToSavedGame } from "~/utils/analytics";
import { useAnalytics } from "~/hooks/use-analytics";
import LeaderboardTable from "~/components/ui/leaderboard-table";
import GameAnalytics from "~/components/ui/game-analytics";
import BadgeSeparator from "~/components/ui/badge-separator";
import GameAwards from "~/components/ui/game-awards";

export default function GameOver() {
  const { isSignedIn, user } = useUser();
  const gameStateStore = useGameStateStore();
  const gameState = useGameState();
  const localGameSave = gameStateToSavedGame({ gameState, userId: "" });
  const utils = api.useUtils();

  const analytics = useAnalytics({
    source: "localState",
    gameState: gameState,
  });

  const gameAlreadySaved = api.game.gameExists.useQuery(gameState.id, {
    refetchOnWindowFocus: false,
    enabled: !!user,
  });
  const saveGame = api.game.saveGame.useMutation({
    onSuccess: async () => {
      await utils.game.invalidate();
    },
  });

  const handlePlayAgainClick = () => {
    gameStateStore.send({ type: "playAgain" });
    redirect("/first-roll");
  };

  const pending = saveGame.isPending || gameAlreadySaved.isPending;

  const alreadySaved = gameAlreadySaved.data === true;

  const disableSaving = alreadySaved || !isSignedIn;

  const saveButtonContent = useMemo(() => {
    if (isSignedIn && !alreadySaved) {
      return (
        <>
          Save Game
          <FloppyDisk size={32} weight="bold" />
        </>
      );
    } else if (!isSignedIn) {
      return "Sign in to save";
    } else if (alreadySaved) {
      return (
        <>
          Game saved!
          <Check size={32} weight="bold" color="#59e271" />
        </>
      );
    }
  }, [alreadySaved, isSignedIn]);

  const handleSaveGameClick = useCallback(async () => {
    if (gameState && user?.id && !disableSaving) {
      saveGame.mutate({ gameState, accountId: user.id });
    }
  }, [disableSaving, gameState, saveGame, user?.id]);

  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-screen-sm flex-col gap-2 p-3">
        <h1 className="w-full text-center text-4xl font-bold">
          <i>GAME OVER</i>
        </h1>
        <LocalLeaderboardTable />
        <Button onClick={handlePlayAgainClick}>Play Again?</Button>
        <LoadingButton
          onClick={handleSaveGameClick}
          loading={pending}
          disabled={disableSaving}
        >
          {saveButtonContent}
        </LoadingButton>
        <BadgeSeparator>Awards</BadgeSeparator>
        {analytics.data && <GameAwards awards={analytics.data} />}
        <BadgeSeparator className="py-4">Analytics</BadgeSeparator>
        <LocalGameAnalytics />
      </section>
    </main>
  );
}
