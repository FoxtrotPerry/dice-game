import Link from "next/link";
import type { ComponentProps } from "react";
import { Button } from "~/components/ui/button";
import { SheetClose } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export default function OptionMenuNavItem({
  className,
  children,
  disabled,
  ...rest
}: ComponentProps<typeof Link> & { disabled?: boolean }) {
  return (
    <SheetClose asChild>
      <Link
        {...rest}
        className={cn("w-full", disabled && "pointer-events-none", className)}
      >
        <Button
          variant="link"
          className={cn(
            "flex w-full justify-start gap-2 rounded-md p-2 no-underline hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-800",
            className,
          )}
          disabled={disabled}
        >
          {children}
        </Button>
      </Link>
    </SheetClose>
  );
}
