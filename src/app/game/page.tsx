"use client";

import { redirect } from "next/navigation";
import BadgeSeparator from "~/components/ui/badge-separator";
import OnDeck from "~/components/ui/on-deck";
import OnTheBoard from "~/components/ui/on-the-board";
import PlayerAvatar from "~/components/ui/player-avatar";
import PlayerToBeat from "~/components/ui/player-to-beat";
import RankBadge from "~/components/ui/rank-badge";
import ScorePad from "~/components/ui/score-pad";
import UndoButton from "~/components/ui/undo-button";
import {
  useCurrentPlayer,
  useFirstPlacePlayer,
  useGameStage,
  useOnDeckPlayers,
} from "~/context/game-state-context";
import { formatScore } from "~/utils/number";

export default function Game() {
  const currentPlayer = useCurrentPlayer();
  const currentGameStage = useGameStage();
  const firstPlacePlayer = useFirstPlacePlayer();
  const onDeckPlayers = useOnDeckPlayers();

  if (!currentPlayer || !currentGameStage) return <></>;

  const inFinalRolls = currentGameStage === "FINAL_ROLLS";

  if (currentGameStage === "GAME_OVER") {
    redirect("/game-over");
  }

  const onDeckText = onDeckPlayers[0]
    ? `On Deck: ${onDeckPlayers[0].name}`
    : null;

  const separatorText = inFinalRolls ? <i>FINAL ROLL</i> : onDeckText;

  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-screen-sm flex-col gap-2 p-3">
        <div className="flex gap-2">
          <PlayerAvatar player={currentPlayer} size="large" />
          <div className="flex w-full flex-col justify-evenly">
            <div className="max-w-[250px] sm:max-w-[350px]">
              <p className="truncate text-4xl font-bold">
                {currentPlayer.name}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RankBadge />
                <p className="text-4xl">{`${formatScore(currentPlayer.score)}`}</p>
              </div>
              <UndoButton />
            </div>
          </div>
        </div>
        <BadgeSeparator>{separatorText}</BadgeSeparator>
        {inFinalRolls && firstPlacePlayer ? <PlayerToBeat /> : <OnDeck />}

        {currentPlayer.onTheBoard ? (
          <ScorePad currentPlayer={currentPlayer} />
        ) : (
          <OnTheBoard currentPlayer={currentPlayer} />
        )}
      </section>
    </main>
  );
}
