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
    <div className={cn("flex max-w-screen-sm justify-evenly gap-2", className)}>
      <div className="flex w-full items-center">
        <Separator />
      </div>
      <Badge className={cn("hover:bg-black dark:hover:bg-white")}>
        <div className="text-nowrap">{children}</div>
      </Badge>
      <div className="flex w-full items-center">
        <Separator />
      </div>
    </div>
  );
}
