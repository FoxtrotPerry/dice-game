import React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { useModal } from "~/hooks/use-modal";

export default function AreYouSure({
  className,
  children,
  modalId,
  title = "Are you sure?",
  description = "Please confirm this action.",
  destructive = false,
  onConfirm,
}: {
  className?: string;
  children: React.ReactNode;
  modalId: string;
  title?: string;
  description?: React.ReactNode;
  destructive?: boolean;
  onConfirm: () => void;
}) {
  const { open, openModal, closeModal } = useModal(modalId);

  const handleConfirmClick = () => {
    onConfirm();
    closeModal();
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={openModal}>
        {children}
      </DialogTrigger>
      <DialogContent
        className={cn("sm:max-w-[425px]", className)}
        onCloseAutoFocus={closeModal}
        onEscapeKeyDown={closeModal}
        onPointerDownOutside={closeModal}
        renderDefaultCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">{description}</div>
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleConfirmClick}
              variant={destructive ? "destructive" : undefined}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
