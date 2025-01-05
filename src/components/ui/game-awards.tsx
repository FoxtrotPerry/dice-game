import { cn } from "~/lib/utils";
import { type UseAnalyticsData } from "~/types/analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Coins, EggCrack } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export default function GameAwards({
  className,
  awards,
}: {
  className?: string;
  awards: NonNullable<UseAnalyticsData>;
}) {
  const { highestTurn, mostNoScores } = awards;
  return (
    <div className={cn("grid grid-cols-1 gap-2 md:grid-cols-2", className)}>
      <Award
        name="High Roller"
        color={highestTurn.highestTurnPlayer?.color}
        playerName={highestTurn.highestTurnPlayer?.name}
        description={"Highest earnings on one singular turn."}
        value={
          <b>
            {`Earned ${highestTurn.highestTurn?.earned} on turn
            #${highestTurn.highestTurn?.turnId}`}
          </b>
        }
        icon={<Coins size={32} />}
      />
      <Award
        name="Biggest Loser"
        color={mostNoScores?.mostNoScoreTurnPlayer?.color}
        playerName={mostNoScores?.mostNoScoreTurnPlayer?.name}
        description="Highest number of turns earning nothing."
        value={
          <b>
            {`Earned nothing a total of ${mostNoScores?.mostNoScoreTurns} times`}
          </b>
        }
        icon={<EggCrack size={32} />}
      />
    </div>
  );
}

function Award({
  color,
  name,
  playerName,
  description,
  value,
  icon,
  className,
}: {
  color?: string;
  name: string;
  playerName?: string;
  description: React.ReactNode;
  value?: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="px-0 pb-2 pt-3">
        <CardTitle>
          <div className="flex items-center justify-center gap-2 text-nowrap">
            {icon}
            <p className="text-xl">{name}</p>
          </div>
          <p style={{ color }} className="text-center text-5xl font-bold">
            {playerName}
          </p>
        </CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
        <div className="flex justify-center">{value}</div>
      </CardHeader>
    </Card>
  );
}
