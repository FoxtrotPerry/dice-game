import { Button } from "~/components/ui/button";
import { SheetClose } from "~/components/ui/sheet";
// import { DrawerClose } from "~/components/ui/drawer";
import { useIsMobile } from "~/hooks/use-mobile";
import { cn } from "~/lib/utils";

export default function OptionMenuButtonItem({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  // const isMobile = useIsMobile();

  // const Close = isMobile ? DrawerClose : SheetClose;

  return (
    <SheetClose asChild>
      <Button
        variant="link"
        onClick={onClick}
        className={cn(
          "flex w-full justify-start gap-2 rounded-md p-2 no-underline hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-800",
          // isMobile && "justify-center",
          className,
        )}
      >
        {children}
      </Button>
    </SheetClose>
  );
}
