"use client";

import BadgeSeparator from "~/components/ui/badge-separator";
import OnDeck from "~/components/ui/on-deck";
import OnTheBoard from "~/components/ui/on-the-board";
import RankBadge from "~/components/ui/rank-badge";
import ScorePad from "~/components/ui/score-pad";
import UndoButton from "~/components/ui/undo-button";
import { useCurrentPlayer, usePlayers } from "~/context/game-state-context";
import { getInitials } from "~/utils/string";

export default function Game() {
  const players = usePlayers();
  const currentPlayer = useCurrentPlayer();

  if (!currentPlayer) return <></>;

  const currentPlayerInitials = getInitials(currentPlayer.name);

  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-screen-sm flex-col gap-2 p-3">
        <div className="flex gap-2">
          <div
            className={`flex aspect-square size-24 items-center justify-center rounded-full border-4 border-solid border-gray-900/30`}
            style={{
              backgroundColor: currentPlayer.color,
            }}
          >
            <p className="text-6xl font-bold dark:text-black">
              {currentPlayerInitials}
            </p>
          </div>
          <div className="flex w-full flex-col justify-evenly">
            <p className="text-4xl font-bold">{currentPlayer.name}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RankBadge />
                <p className="text-4xl">{`${currentPlayer.score}`}</p>
              </div>
              <UndoButton />
            </div>
          </div>
        </div>
        <BadgeSeparator title="On Deck" />
        <OnDeck />
        {currentPlayer.onTheBoard ? (
          <ScorePad currentPlayer={currentPlayer} />
        ) : (
          <OnTheBoard currentPlayer={currentPlayer} />
        )}
      </section>
    </main>
  );
}
