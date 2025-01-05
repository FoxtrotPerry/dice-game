"use client";

import { cn } from "~/lib/utils";
import { format } from "date-fns";
import type { GetGameResponseData } from "~/types/analytics";

export default function SavedGameHeader({
  getGameResp,
  className,
}: {
  getGameResp: GetGameResponseData;
  className?: string;
}) {
  const { username } = getGameResp.userDetails;
  const formattedDate = format(getGameResp.game.createdAt, "PPPP");
  return (
    <div className={cn("text-center", className)}>
      <h1 className="text-3xl font-bold">{`${username}'s Game`}</h1>
      <h2>
        <i>{formattedDate}</i>
      </h2>
    </div>
  );
}
