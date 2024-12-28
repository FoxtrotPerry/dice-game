import { cn } from "~/lib/utils";
import { redirect } from "next/navigation";
import OptionMenuNavItem from "./option-menu-nav-item";
import OptionMenuButtonItem from "./option-menu-button-item";
import { useGameState } from "~/context/game-state-context";
import AreYouSure from "./are-you-sure";

export default function OptionMenuItems({ className }: { className?: string }) {
  const gameState = useGameState();

  const handleResetClick = () => {
    gameState.send({ type: "RESET" });
    redirect("/setup");
  };

  return (
    <div className={cn("flex flex-col gap-2 pb-4", className)}>
      <OptionMenuNavItem href={"/"}>Home</OptionMenuNavItem>
      <OptionMenuNavItem href={"/setup"}>New Game</OptionMenuNavItem>
      <AreYouSure
        onConfirm={handleResetClick}
        title="Confirm game reset"
        destructive
        description={
          <>
            Are you sure you&apos;d like to erase your current game?{" "}
            <b>This action cannot be reversed.</b>
          </>
        }
      >
        <OptionMenuButtonItem className="text-red-600 hover:bg-red-700/15 dark:hover:bg-red-400/15">
          <p>Reset Game</p>
        </OptionMenuButtonItem>
      </AreYouSure>
    </div>
  );
}
