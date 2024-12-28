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

export default function AreYouSure({
  className,
  children,
  title = "Are you sure?",
  description = "Please confirm this action.",
  destructive = false,
  onConfirm,
}: {
  className?: string;
  children: React.ReactNode;
  title?: string;
  description?: React.ReactNode;
  destructive?: boolean;
  onConfirm: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleTriggerClick = () => {
    setIsOpen((curr) => !curr);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirmClick = () => {
    handleClose();
    onConfirm();
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={handleTriggerClick}>
        {children}
      </DialogTrigger>
      <DialogContent
        className={cn("sm:max-w-[425px]", className)}
        onCloseAutoFocus={handleClose}
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
        renderDefaultCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">{description}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" onClick={handleClose}>
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
