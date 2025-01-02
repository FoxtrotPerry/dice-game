import { Card } from "~/components/ui/card";
import { useGameState } from "~/context/game-state-context";
import type { Player } from "~/types/player";
import { Button } from "./button";
import { cn } from "~/lib/utils";

export default function OnTheBoard({
  className,
  currentPlayer,
}: {
  className?: string;
  currentPlayer: Player;
}) {
  const gameState = useGameState();

  if (!currentPlayer) return <></>;

  const handleNotOnBoardClick = () => {
    gameState.send({
      type: "endTurn",
      turnEntry: {
        earned: 0,
        gotOnBoardThisTurn: false,
        newTotal: 0,
        playerId: currentPlayer.id,
      },
    });
  };

  const handleOnBoardClick = () => {
    gameState.send({
      type: "endTurn",
      turnEntry: {
        earned: 0,
        gotOnBoardThisTurn: true,
        newTotal: 0,
        playerId: currentPlayer.id,
      },
    });
  };

  return (
    <Card
      className={cn(
        "flex flex-col gap-2 rounded-3xl border-8 border-solid p-4",
        className,
      )}
      style={{ borderColor: currentPlayer.color }}
    >
      <h3 className="text-center text-4xl font-bold">ON THE BOARD?</h3>
      <Button
        onClick={handleOnBoardClick}
        className="bg-green-600 py-8 hover:bg-green-300 focus:bg-green-600"
      >
        <p className="text-4xl font-bold">YES</p>
      </Button>
      <Button onClick={handleNotOnBoardClick} className="py-8">
        <p className="text-4xl font-bold">NO</p>
      </Button>
    </Card>
  );
}
