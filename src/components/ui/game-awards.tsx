import { cn } from "~/lib/utils";
import { type UseAnalyticsData } from "~/types/analytics";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import {
  Clover,
  Coins,
  Dog,
  Knife,
  Spade,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { Turtle } from "lucide-react";

export default function GameAwards({
  className,
  awards,
}: {
  className?: string;
  awards: NonNullable<UseAnalyticsData>;
}) {
  const { highestTurn, mostNoScores, firstToSteal, underDog, highLowVariance } =
    awards;
  const { highestVariance, lowestVariance } = highLowVariance;
  return (
    <div className={cn("grid grid-cols-1 gap-2 md:grid-cols-2", className)}>
      <Award
        name="High Roller"
        description={"Highest earnings on one singular turn"}
        color={highestTurn.highestTurnPlayer?.color}
        playerName={highestTurn.highestTurnPlayer?.name}
        value={`Earned ${highestTurn.highestTurn?.earned} on turn
            #${highestTurn.highestTurn?.turnId}`}
        icon={<Coins size={32} />}
      />
      <Award
        name="Luck of the Draw"
        description="Earned nothing the most amount of times"
        color={mostNoScores?.mostNoScoreTurnPlayer?.color}
        playerName={mostNoScores?.mostNoScoreTurnPlayer?.name}
        value={`Earned nothing a total of ${mostNoScores?.mostNoScoreTurns} times`}
        icon={<Clover size={32} />}
      />
      {firstToSteal && (
        <Award
          name="Back Stabber"
          description="First person to steal 1st during Final Rolls"
          color={firstToSteal.color}
          icon={<Knife size={32} />}
          playerName={firstToSteal.name}
          value={`Stole 1st place with a score of ${firstToSteal.finalScore}`}
        />
      )}
      {underDog && (
        <Award
          name="Under Dog"
          description={"Had the biggest 2nd half score improvement"}
          color={underDog.underDogPlayer.color}
          icon={<Dog size={32} />}
          playerName={underDog.underDogPlayer.name}
          value={`2nd half average of ${underDog.secondHalfAvg.toFixed(0)} pts/turn`}
        />
      )}
      <Award
        name="Wildcard"
        description="Biggest variance in point earnings per turn"
        color={highestVariance.player?.color}
        icon={<Spade size={32} />}
        playerName={highestVariance.player?.name}
        value={`Variance was ${highestVariance.percentAboveAvg.toFixed(0)}% above average`}
      />
      <Award
        name="Slow n' Steady"
        description="Lowest variance in point earnings per turn"
        color={lowestVariance.player?.color}
        icon={<Turtle size={32} strokeWidth={1.25} />}
        playerName={lowestVariance.player?.name}
        value={`Variance was ${lowestVariance.percentBelowAvg.toFixed(0)}% below average`}
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
        <div className="flex justify-center">
          <b>{value}</b>
        </div>
      </CardHeader>
    </Card>
  );
}
