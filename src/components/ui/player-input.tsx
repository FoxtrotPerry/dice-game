import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import type { ComponentProps } from "react";
import { Input } from "~/components/ui/input";
import { useGameStateStore } from "~/context/game-state-context";
import type { Player } from "~/types/player";

export default function PlayerInput({
  InputProps,
  player,
}: {
  InputProps: ComponentProps<typeof Input>;
  player: Player;
}) {
  const gameState = useGameStateStore();

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    gameState.send({
      type: "changePlayerName",
      playerId: player.id,
      newName: e.target.value,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <UserCircle size={32} weight="duotone" color={player.color} />
      <Input
        className="w-full"
        placeholder="Player"
        onChange={handlePlayerNameChange}
        {...InputProps}
      />
    </div>
  );
}
