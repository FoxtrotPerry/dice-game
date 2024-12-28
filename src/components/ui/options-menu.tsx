import * as React from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Menu } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { useIsMobile } from "~/hooks/use-mobile";
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
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="icon" variant="ghost">
            <Menu className="dark:fill-white" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className={cn("gap-1 px-4", className)}>
          <DrawerTitle className="pt-2">Options Menu</DrawerTitle>
          <DrawerDescription>Game options</DrawerDescription>
          <Separator className="mx-auto" />
          <OptionMenuItems className="mt-2" />
        </DrawerContent>
      </Drawer>
    );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <Menu className="dark:fill-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className={className}>
        <SheetHeader>
          <SheetTitle>Options Menu</SheetTitle>
          <SheetDescription>Game options</SheetDescription>
        </SheetHeader>
        <Separator className="mx-auto" />
        <OptionMenuItems className="mt-2" />
      </SheetContent>
    </Sheet>
  );
}
