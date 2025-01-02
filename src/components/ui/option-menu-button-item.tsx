import { Button } from "~/components/ui/button";
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
  return (
    <Button
      variant="link"
      onClick={onClick}
      className={cn(
        "flex w-full justify-start gap-2 rounded-md p-2 no-underline hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-800",
        className,
      )}
    >
      {children}
    </Button>
  );
}
