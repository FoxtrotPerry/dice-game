import { createStore } from "@xstate/store";
import type { Player } from "~/types/player";
import { playerColor } from "~/types/playerColor";
import { createId } from "@paralleldrive/cuid2";
import { getRandomInt } from "~/utils/math";

export type GameState = {
  players: Player[];
  count: number;
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
  count: 0,
};

export const createGameState = (previousState?: GameState) =>
  createStore({
    context: previousState ?? initialState,
    on: {
      addPlayer: {
        players: (ctx, e: { newPlayer: Player }) => {
          return [...ctx.players, e.newPlayer];
        },
      },
      changePlayerName: {
        players: (ctx, e: { playerId: string; newName: string }) => {
          return ctx.players.map((p) =>
            p.id === e.playerId ? { ...p, name: e.newName } : p,
          );
        },
      },
      deletePlayer: {
        players: (ctx, e: { player: Player }) => {
          return ctx.players.filter((p) => p.id !== e.player.id);
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
      increment: {
        count: (ctx, e: { by: number }) => ctx.count + e.by,
      },
      RESET: () => initialState,
    },
  });
