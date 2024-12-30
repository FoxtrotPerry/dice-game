import { GameState } from "~/context/game-state";

export const getLastPlayer = (ctx: NoInfer<GameState>) => {
  const lastPlayerId =
    ctx.turnOrder[
      ctx.turnOrder.findIndex((playerId) => playerId === ctx.currentPlayerId) -
        1
    ];
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
