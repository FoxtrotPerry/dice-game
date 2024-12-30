import {
  useCurrentPlayer,
  usePlayerRanking,
} from "~/context/game-state-context";
import { getRankColor } from "~/utils/ranking";

export default function RankBadge() {
  const currentPlayer = useCurrentPlayer();
  const currentPlayerRanking = usePlayerRanking(currentPlayer?.id);
  const color = getRankColor(currentPlayerRanking);
  return (
    <div
      className="flex aspect-square size-10 items-center justify-center rounded-full border-4 border-solid border-gray-800/30"
      style={{ backgroundColor: color }}
    >
      <p className="text-xl font-bold text-black">{currentPlayerRanking}</p>
    </div>
  );
}
