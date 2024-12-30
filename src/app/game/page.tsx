"use client";

import OnTheBoard from "~/components/ui/on-the-board";
import ScorePad from "~/components/ui/score-pad";
import { useCurrentPlayer, usePlayers } from "~/context/game-state-context";
import { getInitials } from "~/utils/string";

export default function Game() {
  const players = usePlayers();
  const currentPlayer = useCurrentPlayer();

  if (!currentPlayer) return <></>;

  const currentPlayerInitials = getInitials(currentPlayer.name);

  return (
    <main className="flex justify-center">
      <section className="flex w-full max-w-screen-sm flex-col gap-2 p-2 pt-3">
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
              <p className="text-3xl">{`${currentPlayer.score}`}</p>
              <div>UNDO</div>
            </div>
          </div>
        </div>
        {currentPlayer.onTheBoard ? (
          <ScorePad currentPlayer={currentPlayer} />
        ) : (
          <OnTheBoard currentPlayer={currentPlayer} />
        )}
      </section>
    </main>
  );
}
