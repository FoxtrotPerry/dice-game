import { cn } from "~/lib/utils";
import { Badge } from "./badge";
import { Separator } from "./separator";

export default function BadgeSeparator({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-screen-sm justify-evenly gap-2">
      <div className="flex w-full items-center">
        <Separator />
      </div>
      <Badge className={cn("hover:bg-black dark:hover:bg-white", className)}>
        <div className="text-nowrap">{children}</div>
      </Badge>
      <div className="flex w-full items-center">
        <Separator />
      </div>
    </div>
  );
}
