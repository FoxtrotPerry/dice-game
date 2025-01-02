"use client";

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
import { gameStage } from "~/types/gameStage";
import { formatScore } from "~/utils/number";

export default function Game() {
  const currentPlayer = useCurrentPlayer();
  const currentGameStage = useGameStage();
  const firstPlacePlayer = useFirstPlacePlayer();
  const onDeckPlayers = useOnDeckPlayers();

  if (!currentPlayer || !currentGameStage) return <></>;

  const inFinalRolls = currentGameStage === gameStage.FINAL_ROLLS;

  const onDeckText = onDeckPlayers[0]
    ? `On Deck: ${onDeckPlayers[0].name}`
    : null;

  const separatorText = inFinalRolls ? "PLAYER TO BEAT:" : onDeckText;

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
        <BadgeSeparator title={separatorText} />
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
