"use client";

import { useCallback, useRef } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { useGameStateStore, usePlayers } from "~/context/game-state-context";
import { cn } from "~/lib/utils";

export default function PlayerCountSelect({
  onChange,
  className,
}: {
  onChange?: (value: number) => void;
  className?: string;
}) {
  const values = useRef([2, 3, 4, 5, 6, 7, 8, 9]);
  const gameState = useGameStateStore();
  const players = usePlayers();

  const handleValueChange = useCallback(
    (value: string) => {
      const newValue = Number(value);
      gameState.send({ type: "resizePlayers", newPlayerCount: newValue });
      onChange?.(newValue);
    },
    [gameState, onChange],
  );

  return (
    <Select
      onValueChange={handleValueChange}
      value={players.length.toString()}
      defaultOpen
    >
      <SelectTrigger className={cn("w-16", className)}>
        <SelectValue placeholder="#" />
      </SelectTrigger>
      <SelectContent className="w-16 min-w-0">
        {values.current.map((v) => (
          <SelectItem key={v} value={v.toString()}>
            <p className="text-2xl">{v}</p>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
