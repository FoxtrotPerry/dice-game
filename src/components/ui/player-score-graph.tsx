"use client";

import { Coin } from "@phosphor-icons/react/dist/ssr";

import { Area, AreaChart, CartesianGrid, Label, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { type GetGameResponseGameData } from "~/types/analytics";
import { abbreviateScore } from "~/utils/number";

const chartConfig = {
  score: {
    label: "Score",
    icon: Coin,
  },
} satisfies ChartConfig;

export function PlayerScoreGraph({
  player,
}: {
  player: GetGameResponseGameData["players"][number];
}) {
  const chartData = player.playerTurns.map((turn, i) => ({
    turn: i + 1,
    score: turn.newTotal,
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex">
            <p style={{ color: player.color }}>{player.name}</p>
            {`'s Score
            Chart`}
          </div>
        </CardTitle>
        <CardDescription>Score progression throughout the game</CardDescription>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="turn"
              tickLine={false}
              axisLine={false}
              tickCount={10}
            >
              <Label value="Turn" offset={-5} position="bottom" />
            </XAxis>
            <YAxis
              dataKey="score"
              tickLine={false}
              axisLine={false}
              domain={[0, 10000]}
              tickFormatter={(value: number) => {
                return abbreviateScore(value);
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="score"
              type="step"
              fill={player.color}
              fillOpacity={0.32}
              stroke={player.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
