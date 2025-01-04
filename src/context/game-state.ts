import { createStore } from "@xstate/store";
import type { Player } from "~/types/player";
import { createId } from "@paralleldrive/cuid2";
import { getRandomInt } from "~/utils/math";
import type { TurnEntry } from "~/types/turnEntry";
import { getRankings } from "~/utils/ranking";
import { getLastPlayer, getNextPlayerId } from "~/utils/turns";
import { playerColors } from "~/types/playerColor";
import { type GameState } from "~/types/gameState";

const initialState: GameState = {
  id: createId(),
  players: [
    {
      name: "",
      id: createId(),
      score: 0,
      color: "#FFABAB",
      onTheBoard: false,
    },
    {
      name: "",
      id: createId(),
      score: 0,
      color: "#6EB5FF",
      onTheBoard: false,
    },
  ],
  rankings: [],
  turnOrder: [],
  turnHistory: [],
  gameStage: "SETUP",
  currentPlayerId: "",
  firstToPassThresholdId: "",
  initialSource: "initial",
};

export const createGameState = (savedState?: GameState) =>
  createStore({
    context: savedState ?? initialState,
    on: {
      // #region End Turn
      endTurn: (ctx, e: { turnEntry: TurnEntry }) => {
        /*
         * Find and update the player object with the contents of the turn
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
            ? e.turnEntry.gotOnBoardThisTurn
            : true,
          score: e.turnEntry.newTotal,
        };

        /*
         * Get player who's turn it will be next
         */
        const nextPlayerId = getNextPlayerId(ctx);

        /*
         * Update the player array to include the updates from this turn
         */
        const currentPlayerIndex = ctx.players.findIndex(
          (p) => p.id === e.turnEntry.playerId,
        );
        const updatedPlayers = ctx.players;
        updatedPlayers[currentPlayerIndex] = updatedPlayer;

        /*
         * If the player scored points, update the player rankings
         */
        let newRankings = ctx.rankings;
        if (e.turnEntry.earned > 0) {
          newRankings = getRankings(updatedPlayers);
        }

        /*
         * If the player surpassed the score threshold on this turn
         * and is the first to do so then trigger the transition to
         * the final rolls stage
         */
        let newStage = ctx.gameStage;
        let firstToPassThresholdId = ctx.firstToPassThresholdId;
        if (
          e.turnEntry.newTotal >= 10_000 &&
          ctx.firstToPassThresholdId === ""
        ) {
          newStage = "FINAL_ROLLS";
          firstToPassThresholdId = e.turnEntry.playerId;
        }

        /*
         * If the next player is the first player to pass the score threshold,
         * set the game stage to game over.
         */
        if (
          ctx.firstToPassThresholdId !== "" &&
          nextPlayerId === ctx.firstToPassThresholdId
        ) {
          newStage = "GAME_OVER";
        }

        return {
          ...ctx,
          currentPlayerId: nextPlayerId,
          rankings: newRankings,
          turnHistory: ctx.turnHistory.concat(e.turnEntry),
          gameStage: newStage,
          firstToPassThresholdId,
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
            lastTurnEntry?.gotOnBoardThisTurn === true
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

        /*
         * If the last turn resulted in the transition to last rolls,
         * revert that stage transition
         */
        let firstToPassThresholdId = ctx.firstToPassThresholdId;
        let currentGameStage = ctx.gameStage;
        if (lastTurnEntry.playerId === ctx.firstToPassThresholdId) {
          firstToPassThresholdId = "";
          currentGameStage = "REGULATION";
        }

        return {
          ...ctx,
          players: updatedPlayers,
          currentPlayerId: lastPlayer.id,
          rankings: updatedRankings,
          turnHistory: ctx.turnHistory.slice(0, ctx.turnHistory.length - 1),
          gameStage: currentGameStage,
          firstToPassThresholdId,
        };
      },
      // #endregion

      // #region Play Again
      /**
       * Resets the game but keep the same players
       */
      playAgain: (ctx) => {
        const gameState = ctx;
        const resetPlayers = gameState.players.map((player) => {
          return {
            ...player,
            onTheBoard: false,
            score: 0,
          };
        });
        return {
          ...initialState,
          players: resetPlayers,
          gameStage: "FIRST_ROLL",
          id: createId(),
        } satisfies GameState;
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
            const availableColors = playerColors.filter(
              (c) => !takenColors.includes(c),
            );
            const newPlayers: Player[] = [];
            for (let i = 0; i < numOfNewPlayers; i++) {
              const randColorIndex = getRandomInt(availableColors.length - 1);
              const randomColor = availableColors[randColorIndex];
              availableColors.splice(randColorIndex, 1);
              newPlayers[i] = {
                color: randomColor ?? "#E5DBD9",
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
          gameStage: "FIRST_ROLL",
        } satisfies GameState;
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
          gameStage: "REGULATION",
          turnOrder: playerTurnOrder,
          currentPlayerId: e.firstRoleWinnerId,
        } satisfies GameState;
      },
      // #endregion

      // #region RESET / RESTORE
      RESET: () => initialState,
      RESTORE: (_ctx, e: { savedState: GameState }) => e.savedState,
    },
  });
