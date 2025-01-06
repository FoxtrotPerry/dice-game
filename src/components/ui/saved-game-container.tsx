"use client";

import { useAnalytics } from "~/hooks/use-analytics";
import { api as clientApi } from "~/trpc/react";
import GameAwards from "~/components/ui/game-awards";
import BadgeSeparator from "~/components/ui/badge-separator";
import GameAnalytics from "~/components/ui/game-analytics";
import LeaderboardTable from "~/components/ui/leaderboard-table";
import SavedGameHeader from "~/components/ui/saved-game-header";
import { cn } from "~/lib/utils";

export default function SavedGameContainer({
  gameId,
  className,
}: {
  gameId: string;
  className?: string;
}) {
  const [getGameResp] = clientApi.game?.getGame.useSuspenseQuery(gameId, {
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const analytics = useAnalytics({
    source: "gameSave",
    savedGame: getGameResp.game,
  });

  const { players } = getGameResp.game;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <SavedGameHeader getGameResp={getGameResp} />
      <BadgeSeparator>Results</BadgeSeparator>
      <LeaderboardTable players={players} />
      <BadgeSeparator>Awards</BadgeSeparator>
      {analytics.data && <GameAwards awards={analytics.data} />}
      <BadgeSeparator>Analytics</BadgeSeparator>
      <GameAnalytics players={players} />
    </div>
  );
}
