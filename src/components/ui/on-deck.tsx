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
            className={cn(
              "-mx-1",
              onDeckPlayers.length >= 4 && "-mx-1.5",
              onDeckPlayers.length >= 7 && "-mx-3",
            )}
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
