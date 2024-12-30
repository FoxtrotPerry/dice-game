import { useOnDeckPlayers } from "~/context/game-state-context";
import { cn } from "~/lib/utils";
import PlayerAvatar from "./player-avatar";

// TODO: Allow player badge to be clicked to show turn history for that player

export default function OnDeck({ className }: { className?: string }) {
  const onDeckPlayers = useOnDeckPlayers();
  return (
    <div className={cn("flex justify-center", className)}>
      {onDeckPlayers.map((player, i) => {
        if (!player) return null;
        return (
          <PlayerAvatar
            className="-mr-2.5"
            style={{
              zIndex: onDeckPlayers.length - i,
            }}
            key={player.id}
            player={player}
          />
        );
      })}
    </div>
  );
}
