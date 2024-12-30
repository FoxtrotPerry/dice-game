import { createStore } from "@xstate/store";
import type { Player } from "~/types/player";
import { playerColor } from "~/types/playerColor";
import { createId } from "@paralleldrive/cuid2";
import { getRandomInt } from "~/utils/math";
import { type GameStage, gameStage } from "~/types/gameStage";
import type { TurnEntry } from "~/types/turnEntry";
import { getRankings } from "~/utils/ranking";
import { getLastPlayer, getNextPlayerId } from "~/utils/turns";

export type GameState = {
  players: Player[];
  gameStage: GameStage;
  currentPlayerId: string;
  rankings: string[];
  turnOrder: string[];
  turnHistory: TurnEntry[];
};

const initialState: GameState = {
  players: [
    {
      name: "",
      id: createId(),
      score: 0,
      color: playerColor.BLUE,
      onTheBoard: false,
    },
    {
      name: "",
      id: createId(),
      score: 0,
      color: playerColor.RED,
      onTheBoard: false,
    },
  ],
  rankings: [],
  turnOrder: [],
  turnHistory: [],
  gameStage: gameStage.SETUP,
  currentPlayerId: "",
};

export const createGameState = (savedState?: GameState) =>
  createStore({
    context: savedState ?? initialState,
    on: {
      // #region End Turn
      endTurn: (ctx, e: { turnEntry: TurnEntry }) => {
        /*
         * find and update the player object with the contents of the turn
         */
        let updatedPlayer = ctx.players.find(
          (player) => player.id === e.turnEntry.playerId,
        );
        if (!updatedPlayer) {
          throw new Error(
            "Error occurred when finding player associated with turnEntry",
          );
        }
        updatedPlayer = {
          ...updatedPlayer,
          onTheBoard: !updatedPlayer.onTheBoard
            ? e.turnEntry.gotOnTheBoardThisTurn
            : true,
          score: e.turnEntry.newTotal,
        };

        /*
         * get player who's turn it will be next
         */
        const nextPlayerId = getNextPlayerId(ctx);

        /*
         * update the player array to include the updates from this turn
         */
        const currentPlayerIndex = ctx.players.findIndex(
          (p) => p.id === e.turnEntry.playerId,
        );
        const updatedPlayers = ctx.players;
        updatedPlayers[currentPlayerIndex] = updatedPlayer;

        /*
         * if the player scored points, update the player rankings
         */
        let newRankings = ctx.rankings;
        if (e.turnEntry.earned > 0) {
          newRankings = getRankings(updatedPlayers);
        }

        /*
         * if the player surpassed the score threshold, trigger the transition to the final rolls stage
         */
        let newStage = ctx.gameStage;
        console.log(e.turnEntry.newTotal);
        if (e.turnEntry.newTotal >= 10_000) {
          newStage = gameStage.FINAL_ROLLS;
        }

        return {
          ...ctx,
          currentPlayerId: nextPlayerId,
          rankings: newRankings,
          turnHistory: ctx.turnHistory.concat(e.turnEntry),
          gameStage: newStage,
        };
      },
      // #endregion

      // #region Undo Last Turn
      undoLastTurn: (ctx) => {
        /*
         * Get the last player
         */
        const lastPlayer = getLastPlayer(ctx);

        if (!lastPlayer) {
          throw new Error("Error occurred when finding last player");
        }

        /*
         * Revert the last player's turn
         */
        const lastTurnEntry = ctx.turnHistory.at(-1);

        if (!lastTurnEntry) {
          throw new Error("Error occurred when finding last turn entry");
        }

        const updatedLastPlayer: Player = {
          ...lastPlayer,
          score: lastPlayer.score - (lastTurnEntry?.earned ?? 0),
          onTheBoard:
            lastTurnEntry?.gotOnTheBoardThisTurn === true
              ? false
              : lastPlayer.onTheBoard,
        };

        /*
         * Update the player array
         */
        const updatedPlayers = ctx.players.map((player) => {
          if (player.id === lastPlayer.id) {
            return updatedLastPlayer;
          } else {
            return player;
          }
        });

        /*
         * Update the rankings if the last turn earned the player any points
         */
        let updatedRankings = ctx.rankings;
        if (lastTurnEntry?.earned > 0) {
          updatedRankings = getRankings(updatedPlayers);
        }

        return {
          ...ctx,
          players: updatedPlayers,
          currentPlayerId: lastPlayer.id,
          rankings: updatedRankings,
          turnHistory: ctx.turnHistory.slice(0, ctx.turnHistory.length - 1),
        };
      },
      // #endregion

      // #region Change Player Name
      changePlayerName: {
        players: (ctx, e: { playerId: string; newName: string }) => {
          return ctx.players.map((player) =>
            player.id === e.playerId ? { ...player, name: e.newName } : player,
          );
        },
      },
      // #endregion

      // #region Resize Players
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
                name: "",
                onTheBoard: false,
                score: 0,
              };
            }
            return ctx.players.concat(newPlayers);
          } else {
            return ctx.players.slice(0, e.newPlayerCount);
          }
        },
      },
      // #endregion

      // #region To First Roll
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
        return {
          ...ctx,
          players: namedPlayers,
          gameStage: gameStage.FIRST_ROLL,
        };
      },
      // #endregion

      // #region To Regulation
      progressToRegulation: (ctx, e: { firstRoleWinnerId: string }) => {
        const winnerIndex = ctx.players.findIndex(
          (p) => p.id === e.firstRoleWinnerId,
        );
        const playerTurnOrder = ctx.players
          .slice(winnerIndex)
          .concat(ctx.players.slice(0, winnerIndex))
          .map((player) => player.id);
        return {
          ...ctx,
          gameStage: gameStage.REGULATION,
          turnOrder: playerTurnOrder,
          currentPlayerId: e.firstRoleWinnerId,
        };
      },
      // #endregion

      // #region RESET / RESTORE
      RESET: () => initialState,
      RESTORE: (_ctx, e: { savedState: GameState }) => e.savedState,
    },
  });
