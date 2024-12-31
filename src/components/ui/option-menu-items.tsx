import { cn } from "~/lib/utils";
import { redirect } from "next/navigation";
import OptionMenuNavItem from "./option-menu-nav-item";
import OptionMenuButtonItem from "./option-menu-button-item";
import { useGameState } from "~/context/game-state-context";
import AreYouSure from "./are-you-sure";
import { useModal } from "~/hooks/use-modal";
import {
  ArrowsCounterClockwise,
  HouseLine,
  ListNumbers,
  Ranking,
} from "@phosphor-icons/react/dist/ssr";

export default function OptionMenuItems({ className }: { className?: string }) {
  const gameState = useGameState();
  const resetModal = useModal("modal-reset");
  const leaderboardModal = useModal("modal-leaderboard");
  const turnLogModal = useModal("modal-turn-log");

  const handleResetClick = () => {
    gameState.send({ type: "RESET" });
    redirect("/setup");
  };

  // TODO: Add "Leaderboard" and "Previous Turns" menu items.

  return (
    <div className={cn("flex flex-col gap-2 pb-4", className)}>
      <OptionMenuNavItem href={"/"}>
        <HouseLine size={32} weight="bold" />
        <p className="text-lg">Home</p>
      </OptionMenuNavItem>
      <OptionMenuButtonItem onClick={leaderboardModal.openModal}>
        <Ranking size={32} weight="bold" />
        <p className="text-lg">Leaderboard</p>
      </OptionMenuButtonItem>
      <OptionMenuButtonItem onClick={turnLogModal.openModal}>
        <ListNumbers size={32} weight="bold" />
        <p className="text-lg">Turn Log</p>
      </OptionMenuButtonItem>
      <AreYouSure
        modalId="modal-reset"
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
        <OptionMenuButtonItem
          className="text-red-600 hover:bg-red-700/15 dark:hover:bg-red-400/15"
          onClick={resetModal.closeModal}
        >
          <ArrowsCounterClockwise size={32} weight="bold" />
          <p className="text-lg">Reset Game</p>
        </OptionMenuButtonItem>
      </AreYouSure>
    </div>
  );
}
