import React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { useModal } from "~/hooks/use-modal";
import { useFormattedTurns } from "~/context/game-state-context";

export default function TurnLogDialog({ className }: { className?: string }) {
  const { open, closeModal } = useModal("modal-turn-log");
  const formattedTurns = useFormattedTurns(100);

  const turnsExist = formattedTurns.length > 0;

  return (
    <Dialog open={open}>
      <DialogContent
        className={cn("max-h-screen sm:max-w-[375px]", className)}
        onCloseAutoFocus={closeModal}
        onEscapeKeyDown={closeModal}
        onPointerDownOutside={closeModal}
        onCloseClick={closeModal}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl">Turn Log</DialogTitle>
          <DialogDescription>Last 100 turns</DialogDescription>
        </DialogHeader>
        {turnsExist ? (
          <div className="max-h-[75vh] overflow-y-auto">
            <div className="table w-full">
              <div className="sticky top-0 table-header-group">
                <div className="table-row bg-white dark:bg-black">
                  <div className="table-cell text-left font-bold">Turn #</div>
                  <div className="table-cell text-left font-bold">
                    <p className="pl-2">Event</p>
                  </div>
                </div>
              </div>
              <div className="table-row-group">
                {formattedTurns.map((turn, i) => (
                  <div key={i} className="table-row">
                    <div className="table-cell">
                      <p className="text-left">{formattedTurns.length - i}.</p>
                    </div>
                    <div className="table-cell">
                      <p key={i} className="pl-2">
                        {turn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="pb-6 pt-3">
            <p className="text-center text-gray-500">No turns yet!</p>
            <p className="text-center text-xs text-gray-500">
              Turns will show here as soon as the first turn is made
            </p>
          </div>
        )}
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button onClick={closeModal}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
