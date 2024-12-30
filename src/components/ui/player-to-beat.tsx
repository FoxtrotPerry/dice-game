import { formatScore } from "~/utils/number";
import PlayerAvatar from "./player-avatar";
import {
  useCurrentPlayer,
  useFirstPlacePlayer,
} from "~/context/game-state-context";

export default function PlayerToBeat() {
  const currentPlayer = useCurrentPlayer();
  const firstPlacePlayer = useFirstPlacePlayer();
  if (!firstPlacePlayer || !currentPlayer) return <></>;
  return (
    <div className="flex items-center justify-center gap-2">
      <PlayerAvatar player={firstPlacePlayer} size="small" />
      <div className="flex flex-col">
        <p className="text-3xl font-bold">
          {formatScore(firstPlacePlayer.score)} points
        </p>
        <p className="text-xl">{`Get ${firstPlacePlayer.score - currentPlayer.score} points to tie!`}</p>
      </div>
    </div>
  );
}
