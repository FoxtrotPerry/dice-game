"use client";

import { usePlayerRankings } from "~/context/game-state-context";
import { Trophy } from "@phosphor-icons/react/dist/ssr";
import { medalColors } from "~/types/medalColors";
import { cn } from "~/lib/utils";

export default function LeaderboardTable({
  className,
}: {
  className?: string;
}) {
  const playerRankings = usePlayerRankings();

  const getIcon = (place: number) => {
    switch (place) {
      case 1:
        return <Trophy size={32} weight="duotone" color={medalColors.GOLD} />;
      case 2:
        return <Trophy size={32} weight="duotone" color={medalColors.SILVER} />;
      case 3:
        return <Trophy size={32} weight="duotone" color={medalColors.BRONZE} />;
      default:
        return <b>{`${place}th`}</b>;
    }
  };

  return (
    <table className={cn("my-2 table-auto", className)}>
      <thead>
        <tr>
          <th>Place</th>
          <th className="text-left">Player</th>
          <th className="text-left">Score</th>
        </tr>
      </thead>
      <tbody>
        {playerRankings.map((rankedPlayer, i) => {
          return (
            <tr className="h-10" key={rankedPlayer?.id}>
              <td>
                <div className="flex justify-center">{getIcon(i + 1)}</div>
              </td>
              <td className="max-w-[150px]">
                <p className="truncate text-2xl">{rankedPlayer?.name}</p>
              </td>
              <td>
                <p className="text-2xl">{rankedPlayer?.score}</p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
