import { cn } from "~/lib/utils";

export default function InstructionItem({
  className,
  number,
  children,
}: {
  className?: string;
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
        <p className="text-xl">{number}</p>
      </div>
      {children}
    </div>
  );
}
