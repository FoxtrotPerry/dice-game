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
import LocalLeaderboardTable from "./local-leaderboard-table";

export default function LeaderboardDialog({
  className,
}: {
  className?: string;
}) {
  const { open, closeModal } = useModal("leaderboard");
  const playerRankings = usePlayerRankings();

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
            <LocalLeaderboardTable className="my-2 w-full" />
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
