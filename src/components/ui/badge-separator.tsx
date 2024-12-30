import { Badge } from "./badge";
import { Separator } from "./separator";

export default function BadgeSeparator({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  return (
    <div className="flex max-w-screen-sm justify-evenly gap-2">
      <div className="flex w-full items-center">
        <Separator />
      </div>
      <Badge className={className}>
        <i className="text-nowrap">{title}</i>
      </Badge>
      <div className="flex w-full items-center">
        <Separator />
      </div>
    </div>
  );
}
