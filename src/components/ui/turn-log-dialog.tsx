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

export default function TurnLogDialog({ className }: { className?: string }) {
  const { open, closeModal } = useModal("modal-turn-log");

  const handleConfirmClick = () => {
    closeModal();
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
        <DialogHeader>
          <DialogTitle className="text-3xl">Turn Log</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">Something</div>
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button onClick={handleConfirmClick}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
