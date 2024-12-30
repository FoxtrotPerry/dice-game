"use client";

import PlayerSelect from "~/components/ui/player-select";
import FirstRollInstructions from "~/components/ui/first-roll-instructions";
import { redirect } from "next/navigation";
import { useGameStage, useGameState } from "~/context/game-state-context";
import { Button } from "~/components/ui/button";
import { DiceFive } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function FirstRoll() {
  const gameState = useGameState();
  const gameStage = useGameStage();
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const handleFinishedClick = () => {
    if (selectedPlayer === null) return;
    gameState.send({
      type: "progressToRegulation",
      firstRoleWinnerId: selectedPlayer,
    });
    redirect("/game");
  };

  const handlePlayerChange = (playerId: string) => {
    setSelectedPlayer(playerId);
  };

  return (
    <main className="flex justify-center">
      <section className="flex max-w-[22rem] flex-col gap-2 pt-4">
        <h1 className="text-center text-3xl font-bold">
          <i>ROLL FOR FIRST TURN</i>
        </h1>
        <FirstRollInstructions />
        <div className="flex justify-center">
          <PlayerSelect className="w-40" onChange={handlePlayerChange} />
        </div>
        <Button
          className="w-full [&_svg]:size-5"
          onClick={handleFinishedClick}
          disabled={selectedPlayer === null}
        >
          <DiceFive />
          {`Let's Play!`}
        </Button>
      </section>
    </main>
  );
}
