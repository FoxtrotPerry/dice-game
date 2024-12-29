"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "~/components/ui/select";
import { usePlayers } from "~/context/game-state-context";

export default function PlayerSelect({ className }: { className?: string }) {
  const players = usePlayers();
  return (
    <Select>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Who won?" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Players</SelectLabel>
          {players.map((player) => {
            return (
              <SelectItem key={player.id} value={player.id}>
                {player.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
