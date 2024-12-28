"use client";

import PlayerCountSelect from "~/components/ui/player-count-select";
import { Button } from "~/components/ui/button";
import PlayersInputList from "~/components/ui/players-input-list";
import { redirect } from "next/navigation";
import { useGameState } from "~/context/game-state-context";
import { DiceFive } from "@phosphor-icons/react/dist/ssr";

export default function Setup() {
  const gameState = useGameState();
  const handleFinishedClick = () => {
    gameState.send({ type: "progressToFirstRollStage" });
    redirect("/first-roll");
  };

  return (
    <main className="flex justify-center">
      <section className="flex max-w-screen-sm flex-col gap-2 pt-4">
        <h1 className="text-center text-3xl font-bold">
          <i>NEW GAME</i>
        </h1>
        <div className="flex items-center justify-center gap-3">
          <p className="text-xl">How many players?</p>
          <PlayerCountSelect />
        </div>
        <PlayersInputList />
        <Button className="w-full [&_svg]:size-5" onClick={handleFinishedClick}>
          <DiceFive />
          {`Let's Roll!`}
        </Button>
      </section>
    </main>
  );
}
