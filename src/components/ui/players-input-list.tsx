"use client";

import { usePlayers } from "~/context/game-state-context";
import { cn } from "~/lib/utils";
import PlayerInput from "./player-input";

export default function PlayersInputList({
  className,
}: {
  className?: string;
}) {
  const players = usePlayers();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {players.map((player, index) => (
        <PlayerInput
          key={index}
          InputProps={{
            value: player.name,
            tabIndex: index + 1,
          }}
          player={player}
        />
      ))}
    </div>
  );
}
