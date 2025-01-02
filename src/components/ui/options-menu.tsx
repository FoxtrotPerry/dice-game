import * as React from "react";

import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "~/components/ui/sheet";
import OptionMenuItems from "~/components/ui/option-menu-items";
import { useModal } from "~/hooks/use-modal";

export default function OptionsMenu({ className }: { className?: string }) {
  const { open, openModal, closeModal } = useModal("drawer");

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" onClick={openModal}>
          <Menu className="dark:fill-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={className}
        onCloseAutoFocus={closeModal}
        onEscapeKeyDown={closeModal}
        onPointerDownOutside={closeModal}
        onCloseClick={closeModal}
      >
        <SheetHeader className="pl-1 pt-1">
          <SheetTitle>Options Menu</SheetTitle>
          <SheetDescription className="pb-1 leading-none">
            Game options
          </SheetDescription>
        </SheetHeader>
        <Separator className="mx-auto mt-2" />
        <OptionMenuItems className="mt-2" />
      </SheetContent>
    </Sheet>
  );
}
