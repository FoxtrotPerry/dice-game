import React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { useModal } from "~/hooks/use-modal";
import { usePlayerRankings } from "~/context/game-state-context";
import { Trophy } from "@phosphor-icons/react/dist/ssr";
import { medalColors } from "~/types/medalColors";
import { formatScore } from "~/utils/number";

export default function LeaderboardDialog({
  className,
}: {
  className?: string;
}) {
  const { open, closeModal } = useModal("leaderboard");
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
        return `${place}th`;
    }
  };

  const rankingsExist = playerRankings.length > 0;

  return (
    <Dialog open={open}>
      <DialogContent
        className={cn("sm:max-w-[425px]", className)}
        onCloseAutoFocus={closeModal}
        onEscapeKeyDown={closeModal}
        onPointerDownOutside={closeModal}
        onCloseClick={closeModal}
      >
        <div className="w-full">
          <DialogHeader>
            <DialogTitle className="text-3xl">Leaderboard</DialogTitle>
          </DialogHeader>
          {rankingsExist ? (
            <table className="my-2 w-full table-auto">
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
                        <div className="flex justify-center">
                          {getIcon(i + 1)}
                        </div>
                      </td>
                      <td className="max-w-[150px]">
                        <p className="truncate text-2xl">
                          {rankedPlayer?.name}
                        </p>
                      </td>
                      <td>
                        <p className="text-2xl">
                          {formatScore(rankedPlayer?.score ?? 0)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="pb-6 pt-3">
              <p className="text-center text-gray-500">No rankings yet!</p>
              <p className="text-center text-xs text-gray-500">
                Rankings will show up as soon as points are scored
              </p>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <DialogClose asChild>
              <Button onClick={closeModal}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
