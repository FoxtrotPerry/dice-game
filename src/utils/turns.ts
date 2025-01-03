import type { GameState } from "~/types/gameState";

export const getLastPlayer = (ctx: NoInfer<GameState>) => {
  const currentPlayerIndex = ctx.turnOrder.findIndex(
    (playerId) => playerId === ctx.currentPlayerId,
  );
  const lastPlayerIndex =
    currentPlayerIndex === 0 ? ctx.players.length - 1 : currentPlayerIndex - 1;
  const lastPlayerId = ctx.turnOrder[lastPlayerIndex];
  const lastPlayer = ctx.players.find((player) => player.id === lastPlayerId);
  return lastPlayer;
};

export const getNextPlayerId = (ctx: NoInfer<GameState>) => {
  const currentTurnOrderIndex = ctx.turnOrder.findIndex(
    (id) => id === ctx.currentPlayerId,
  );
  const nextPlayerId =
    ctx.turnOrder[(currentTurnOrderIndex + 1) % ctx.turnOrder.length];
  if (!nextPlayerId) throw new Error("Error occurred when finding next player");
  return nextPlayerId;
};
