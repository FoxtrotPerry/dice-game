"use client";

import { useAnalytics } from "~/hooks/use-analytics";
import { api as clientApi } from "~/trpc/react";
import GameAnalytics from "./game-analytics";

export default function SavedGameAnalytics({
  gameId,
  className,
}: {
  gameId: string;
  className?: string;
}) {
  const [getGameResp] = clientApi.game?.getGame.useSuspenseQuery(gameId);

  const analytics = useAnalytics({
    source: "gameSave",
    savedGame: getGameResp.game,
  });

  return (
    <div className={className}>
      <GameAnalytics analytics={analytics.data} />
    </div>
  );
}
