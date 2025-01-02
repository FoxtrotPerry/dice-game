import { useGameState } from "~/context/game-state-context";
import { redirect } from "next/navigation";
import AreYouSure from "./are-you-sure";

export default function ResetDialog() {
  const gameState = useGameState();

  const handleResetClick = () => {
    gameState.send({ type: "RESET" });
    redirect("/setup");
  };

  return (
    <AreYouSure
      modalId="reset"
      onConfirm={handleResetClick}
      title="Confirm game reset"
      destructive
      description={
        <p>
          Are you sure you&apos;d like to erase your current game?{" "}
          <b>This action cannot be reversed.</b>
        </p>
      }
    />
  );
}
