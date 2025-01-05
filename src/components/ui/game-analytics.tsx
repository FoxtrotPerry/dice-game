import type { GetGameResponseGameData } from "~/types/analytics";
import { PlayerScoreGraph } from "./player-score-graph";
import { cn } from "~/lib/utils";

export default function GameAnalytics({
  players,
  className,
}: {
  players: GetGameResponseGameData["players"];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {players.map((player) => {
        return <PlayerScoreGraph player={player} key={player.id} />;
      })}
    </div>
  );
}
