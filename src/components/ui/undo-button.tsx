import { ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./button";
import {
  useGameStateStore,
  useTurnHistory,
} from "~/context/game-state-context";
import { cn } from "~/lib/utils";
import AreYouSure from "./are-you-sure";

export default function UndoButton({ className }: { className?: string }) {
  const gameState = useGameStateStore();
  const turnHistory = useTurnHistory();

  const handleUndoClick = () => {
    gameState.send({ type: "undoLastTurn" });
  };

  return (
    <AreYouSure
      modalId="undo"
      onConfirm={handleUndoClick}
      title="Undo last turn?"
      description="Are you sure you want to undo the last turn? This action cannot be undone."
    >
      <Button
        className={cn(
          "size-12 rounded-full border-4 border-solid border-gray-500/50 bg-gray-200 hover:bg-gray-500 focus:bg-gray-200 disabled:bg-gray-200 disabled:focus:bg-gray-200 dark:bg-gray-700 dark:hover:bg-slate-500 disabled:dark:bg-gray-700 [&_svg]:size-6",
          className,
        )}
        disabled={turnHistory.length === 0}
        size="icon"
      >
        <ArrowCounterClockwise
          size={32}
          weight="bold"
          className="fill-gray-800 dark:fill-gray-100"
        />
      </Button>
    </AreYouSure>
  );
}
