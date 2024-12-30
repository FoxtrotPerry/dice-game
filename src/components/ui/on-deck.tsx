import { useOnDeckPlayers } from "~/context/game-state-context";
import { cn } from "~/lib/utils";
import { getInitials } from "~/utils/string";

export default function OnDeck({ className }: { className?: string }) {
  const onDeckPlayers = useOnDeckPlayers();
  return (
    <div className={cn("flex justify-center", className)}>
      {onDeckPlayers.map((player, i) => {
        if (!player) return null;
        return (
          <div
            className={`-mr-2.5 flex aspect-square size-16 items-center justify-center rounded-full border-4 border-solid border-gray-900/30`}
            style={{
              backgroundColor: player.color,
              zIndex: onDeckPlayers.length - i,
            }}
            key={player.id}
          >
            <p className="text-4xl font-bold dark:text-black">
              {getInitials(player.name)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
