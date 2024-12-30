import Link from "next/link";
import { Button } from "~/components/ui/button";
import { SheetClose } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export default function OptionMenuNavItem({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <SheetClose asChild>
      <Link href={href} className="w-full">
        <Button
          variant="link"
          className={cn(
            "flex w-full justify-start gap-2 rounded-md p-2 no-underline hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-800",
            className,
          )}
        >
          {children}
        </Button>
      </Link>
    </SheetClose>
  );
}
