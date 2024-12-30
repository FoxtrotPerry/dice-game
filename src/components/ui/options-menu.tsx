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

// TODO: Handle open state of Drawers, Sheets, and nested Dialog components via search params

export default function OptionsMenu({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = React.useCallback(() => {
    setOpen((currOpen) => !currOpen);
  }, []);

  return (
    <Sheet open={open} onOpenChange={toggleOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <Menu className="dark:fill-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className={className}>
        <SheetHeader className="pl-1 pt-1">
          <SheetTitle>Options Menu</SheetTitle>
          <SheetDescription className="pb-1 leading-none">
            Game options
          </SheetDescription>
        </SheetHeader>
        <Separator className="mx-auto" />
        <OptionMenuItems className="mt-2" />
      </SheetContent>
    </Sheet>
  );
}
