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

export default function LeaderboardDialog({
  className,
}: {
  className?: string;
}) {
  const { open, closeModal } = useModal("modal-leaderboard");
  const playerRankings = usePlayerRankings();

  const handleConfirmClick = () => {
    closeModal();
  };

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

  return (
    <Dialog open={open}>
      <DialogContent
        className={cn("sm:max-w-[425px]", className)}
        onCloseAutoFocus={closeModal}
        onEscapeKeyDown={closeModal}
        onPointerDownOutside={closeModal}
        renderDefaultCloseButton={false}
      >
        <div className="w-full">
          <DialogHeader>
            <DialogTitle className="text-3xl">Leaderboard</DialogTitle>
          </DialogHeader>
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
          <DialogFooter className="flex gap-2">
            <DialogClose asChild>
              <Button onClick={handleConfirmClick}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}