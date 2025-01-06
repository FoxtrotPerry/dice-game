"use client";

import Link from "next/link";
import { cn } from "~/lib/utils";
import { api as clientApi } from "~/trpc/react";
import { format } from "date-fns";

export default function GameListContainer({
  className,
}: {
  className?: string;
}) {
  const [getGameResp] = clientApi.game?.getUsersGames.useSuspenseQuery();
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {getGameResp.map((game) => {
        const playerCount = game.players.length;
        return (
          <Link href={`/game/${game.id}`} key={game.id}>
            <li className="flex flex-col gap-2 rounded-lg border-2 border-solid border-slate-200 bg-gray-100 px-3 py-2 hover:bg-gray-200 dark:border-slate-800 dark:bg-gray-800 hover:dark:bg-gray-700">
              <p className="text-sm">{`${game.players.map((player) => player.name).join(", ")}`}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs">
                  Played on: {format(game.createdAt, "PPPP")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {playerCount} player game
                </p>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
