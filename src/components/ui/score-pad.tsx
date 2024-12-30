"use client";

import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Button } from "./button";
import { useState } from "react";
import { useGameState } from "~/context/game-state-context";
import { Player } from "~/types/player";

const numpadItems = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "CLEAR",
  "0",
  "END TURN",
] as const;

export default function ScorePad({
  className,
  currentPlayer,
}: {
  className?: string;
  currentPlayer: Player;
}) {
  const gameState = useGameState();
  const [score, setScore] = useState(0);

  const handleNumpadClick = (
    value: (typeof numpadItems)[keyof typeof numpadItems],
  ) => {
    switch (value) {
      case "CLEAR":
        setScore(0);
        break;
      case "END TURN":
        gameState.send({
          type: "endTurn",
          turnEntry: {
            earned: score,
            playerId: currentPlayer.id,
            newTotal: currentPlayer.score + score,
            gotOnTheBoardThisTurn: false,
          },
        });
        setScore(0);
        break;
      default:
        if (score.toString().length < 9) {
          setScore((currentScore) => {
            return Number(currentScore.toString() + value);
          });
        }
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <Card
        className="relative max-w-full rounded-3xl border-8 border-solid px-2"
        style={{ borderColor: currentPlayer.color }}
      >
        <p className="overflow-ellipsis whitespace-nowrap py-2 text-center text-5xl font-bold">{`+${score}`}</p>
      </Card>
      <Card
        className={
          "grid grid-cols-3 overflow-hidden rounded-3xl border-8 border-solid"
        }
        style={{ borderColor: currentPlayer.color }}
      >
        {numpadItems.map((numpadItem) => {
          const isNumber = Number.isInteger(Number(numpadItem));
          return (
            <div
              key={numpadItem}
              className="border-[0.5px] border-solid border-gray-200 dark:border-gray-800"
            >
              <Button
                variant="ghost"
                className={cn(
                  "h-full w-full rounded-none py-2 text-xl",
                  isNumber && "text-5xl",
                )}
                onClick={() => handleNumpadClick(numpadItem)}
              >
                <b>{numpadItem}</b>
              </Button>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
