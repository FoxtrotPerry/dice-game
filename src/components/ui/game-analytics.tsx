"use client";

import { useState } from "react";
import { api as clientApi } from "~/trpc/react";
import { getHighestTurnAnalytics } from "~/utils/analytics";

export default function GameAnalytics({ gameId }: { gameId: string }) {
  const [gameAnalytics, setGameAnalytics] = useState<
    [Awaited<ReturnType<typeof getHighestTurnAnalytics>>] | null
  >(null);
  const [game] = clientApi.game?.getGame.useSuspenseQuery(gameId);

  Promise.all([getHighestTurnAnalytics(game)]).then((resp) => {
    setGameAnalytics(resp);
  });

  return <div></div>;
}
