import type { GetGameResponseGameData } from "~/types/analytics";
import { type GameState } from "~/types/gameState";

/**
 * Converts game state to the shape of a response from `getGame`
 */
export const gameStateToSavedGame = ({
  gameState,
  userId,
}: {
  gameState: GameState;
  userId: string;
}): NonNullable<GetGameResponseGameData> => {
  const turns: GetGameResponseGameData["turns"] = gameState.turnHistory.map(
    (turn, i) => {
      return {
        ...turn,
        turnId: i,
        gameId: gameState.id,
      };
    },
  );
  const players: GetGameResponseGameData["players"] = gameState.players.map(
    (player) => {
      const rank = gameState.rankings.findIndex(
        (playerId) => playerId === player.id,
      );
      const playerTurns = turns.filter((turn) => turn.playerId === player.id);
      return {
        ...player,
        gameId: gameState.id,
        playerTurns,
        rank: rank !== -1 ? rank + 1 : rank,
        finalScore: player.score,
      };
    },
  );
  const sortedPlayers = players.toSorted((a, b) => b.finalScore - a.finalScore);
  return {
    accountId: userId,
    id: gameState.id,
    turns,
    players: sortedPlayers,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

/**
 * Get the player who had the highest earnings in a single turn during the game
 */
export const getHighestTurnAnalytics = async (
  data: GetGameResponseGameData,
) => {
  const { turns, players } = data;
  let highestTurn = turns[0];
  turns.forEach((turn) => {
    if (turn.earned > (highestTurn?.earned ?? 0)) {
      highestTurn = turn;
    }
  });
  const highestTurnPlayer = players.find((player) => {
    return player.id === highestTurn?.playerId;
  });
  return { highestTurnPlayer, highestTurn };
};

/**
 * Get the player who had the most turns earning no points
 */
export const getMostNoScoreTurns = async (data: GetGameResponseGameData) => {
  const { players } = data;
  let mostNoScoreTurns = 0;
  let mostNoScoreTurnPlayer = players[0];
  players.forEach((player) => {
    const numOfNoScoreTurns = player.playerTurns.filter(
      (turn) => turn.earned === 0,
    ).length;
    if (numOfNoScoreTurns > mostNoScoreTurns) {
      mostNoScoreTurns = numOfNoScoreTurns;
      mostNoScoreTurnPlayer = player;
    }
  });

  return {
    mostNoScoreTurns,
    mostNoScoreTurnPlayer,
  };
};

export const getFirstPlayerToStealFirst = async (
  data: GetGameResponseGameData,
) => {
  const playersOverThreshold = data.players.filter(
    (player) => player.finalScore >= 10000,
  );
  if (playersOverThreshold.length > 1) {
    // [-1] will be first person to pass threshold
    // [-2] will be first person to beat current winner's score
    return playersOverThreshold.at(-2);
  }
  return null;
};

type UnderDog = {
  underDogPlayer: GetGameResponseGameData["players"][number];
  diff: number;
  secondHalfAvg: number;
};
export const getUnderDog = async (data: GetGameResponseGameData) => {
  if (data.players.length === 0) return null;
  let underDog: UnderDog = {
    diff: -Infinity,
    underDogPlayer: data.players[0]!,
    secondHalfAvg: 0,
  };
  data.players.forEach((player) => {
    const middle = Math.round(player.playerTurns.length / 2);

    const firstHalfTotal = player.playerTurns[middle]?.newTotal ?? 0;
    const secondHalfTotal =
      (player.playerTurns.at(-1)?.newTotal ?? 0) - firstHalfTotal;

    const turnsInFirstHalf = middle + 1;
    const turnsInSecondHalf = player.playerTurns.length - middle;

    const firstHalfAvg = firstHalfTotal / turnsInFirstHalf;
    const secondHalfAvg = secondHalfTotal / turnsInSecondHalf;

    const diff = secondHalfAvg - firstHalfAvg;

    if (underDog === undefined || diff > underDog?.diff) {
      underDog = {
        underDogPlayer: player,
        diff,
        secondHalfAvg,
      };
    }
  });
  return underDog;
};

export const getHighLowVariance = async (data: GetGameResponseGameData) => {
  let highestVariance = {
    player: data.players[0],
    variance: 0,
    percentAboveAvg: 0,
  };
  let lowestVariance = {
    player: data.players[0],
    variance: Infinity,
    percentBelowAvg: 0,
  };

  let varianceSum = 0;

  // Calculate highest and lowest variance
  data.players.forEach((player) => {
    const earnedAvg = player.finalScore / player.playerTurns.length;
    let squaredDistanceToMeanSum = 0;
    player.playerTurns.forEach((turn) => {
      const distToMean = turn.earned - earnedAvg;
      const squaredDistanceToMean = distToMean * distToMean;
      squaredDistanceToMeanSum += squaredDistanceToMean;
    });
    const variance = squaredDistanceToMeanSum / (player.playerTurns.length - 1);
    varianceSum += variance;
    if (variance > highestVariance.variance) {
      highestVariance = {
        player,
        variance,
        percentAboveAvg: 0,
      };
    } else if (variance < lowestVariance.variance) {
      lowestVariance = {
        player,
        variance,
        percentBelowAvg: 0,
      };
    }
  });

  // calculate percentages
  const varianceAvg = varianceSum / data.players.length;
  const percentAbove = (highestVariance.variance / varianceAvg) * 100;
  const percentBelow = (varianceAvg / lowestVariance.variance) * 100;
  highestVariance.percentAboveAvg = percentAbove;
  lowestVariance.percentBelowAvg = percentBelow;

  return { highestVariance, lowestVariance };
};
