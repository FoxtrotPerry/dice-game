import type { SavedGameResponse } from "~/types/analytics";
import { type GameState } from "~/types/gameState";

/**
 * Converts game state to the shape of a response from `getGame`
 */
export const gameStateToFetchedGame = ({
  gameState,
  userId,
}: {
  gameState: GameState;
  userId: string;
}): NonNullable<SavedGameResponse> => {
  const turns: NonNullable<SavedGameResponse>["turns"] =
    gameState.turnHistory.map((turn, i) => {
      return {
        ...turn,
        turnId: i,
        gameId: gameState.id,
      };
    });
  const players: NonNullable<SavedGameResponse>["players"] =
    gameState.players.map((player) => {
      const rank = gameState.rankings.findIndex(
        (playerId) => playerId === player.id,
      );
      return {
        ...player,
        gameId: gameState.id,
        rank: rank !== -1 ? rank + 1 : rank,
      };
    });
  return {
    accountId: userId,
    id: gameState.id,
    turns,
    players,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const getHighestTurnAnalytics = async (
  data: NonNullable<SavedGameResponse>,
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
