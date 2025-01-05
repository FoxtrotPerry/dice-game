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
