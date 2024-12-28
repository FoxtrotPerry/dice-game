import { createStore } from "@xstate/store";
import type { Player } from "~/types/player";
import { playerColor } from "~/types/playerColor";
import { createId } from "@paralleldrive/cuid2";
import { getRandomInt } from "~/utils/math";
import { gameStage } from "~/types/gameStage";

export type GameState = {
  players: Player[];
  gameStage: (typeof gameStage)[keyof typeof gameStage];
};

const initialState: GameState = {
  players: [
    {
      name: "",
      id: createId(),
      score: 0,
      scoreHistory: [],
      color: playerColor.BLUE,
      onTheBoard: false,
      isPlayersTurn: false,
    },
    {
      name: "",
      id: createId(),
      score: 0,
      scoreHistory: [],
      color: playerColor.RED,
      onTheBoard: false,
      isPlayersTurn: false,
    },
  ],
  gameStage: gameStage.SETUP,
};

export const createGameState = (savedState?: GameState) =>
  createStore({
    context: savedState ?? initialState,
    on: {
      // #region PLAYER EVENTS
      changePlayerName: {
        players: (ctx, e: { playerId: string; newName: string }) => {
          return ctx.players.map((p) =>
            p.id === e.playerId ? { ...p, name: e.newName } : p,
          );
        },
      },
      resizePlayers: {
        players: (ctx, e: { newPlayerCount: number }) => {
          if (e.newPlayerCount === ctx.players.length) return;
          if (e.newPlayerCount > ctx.players.length) {
            // If the new amount of players is greater than what we have now,
            // we need to generate some more players
            const numOfNewPlayers = e.newPlayerCount - ctx.players.length;
            const takenColors = ctx.players.map((player) => player.color);
            const availableColors = Object.values(playerColor).filter(
              (c) => !takenColors.includes(c),
            );
            const newPlayers: Player[] = [];
            for (let i = 0; i < numOfNewPlayers; i++) {
              const randColorIndex = getRandomInt(availableColors.length - 1);
              const randomColor = availableColors[randColorIndex];
              availableColors.splice(randColorIndex, 1);
              newPlayers[i] = {
                color: randomColor ?? playerColor.VANILLA,
                id: createId(),
                isPlayersTurn: false,
                name: "",
                onTheBoard: false,
                score: 0,
                scoreHistory: [],
              };
            }
            return ctx.players.concat(newPlayers);
          } else {
            return ctx.players.slice(0, e.newPlayerCount);
          }
        },
      },
      progressToFirstRollStage: (ctx) => {
        // make sure all players have a name
        const namedPlayers = ctx.players.map((player, i) => {
          const playerName =
            player.name !== "" ? player.name : `Player ${i + 1}`;
          return {
            ...player,
            name: playerName,
          };
        });
        return { ...ctx, players: namedPlayers };
      },
      // #endregion
      // #region LOAD / RESET
      RESET: () => initialState,
      RESTORE: (_ctx, e: { savedState: GameState }) => e.savedState,
    },
  });
