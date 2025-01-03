import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  games,
  type InsertPlayer,
  type InsertRanking,
  type InsertTurn,
  player,
  ranking,
  turns,
} from "~/server/db/schema";
import { zGameState } from "~/types/gameState";

export const gameRouter = createTRPCRouter({
  saveGame: publicProcedure
    .input(z.object({ gameState: zGameState, accountId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { gameState, accountId } = input;
      const addToGames = ctx.db
        .insert(games)
        .values({
          id: gameState.id,
          accountId,
        })
        .returning();

      const turnValues: InsertTurn[] = gameState.turnHistory.map((turn, i) => ({
        earned: turn.earned,
        gameId: gameState.id,
        newTotal: turn.newTotal,
        playerId: turn.playerId,
        turnId: i,
        gotOnBoardThisTurn: turn.gotOnBoardThisTurn,
      }));

      const addToTurns = ctx.db.insert(turns).values(turnValues).returning();

      const rankingValues: InsertRanking[] = gameState.rankings.map(
        (playerId, i) => ({
          gameId: gameState.id,
          playerId,
          rank: i + 1,
        }),
      );

      const addToRankings = ctx.db
        .insert(ranking)
        .values(rankingValues)
        .returning();

      const playerValues: InsertPlayer[] = gameState.players.map((player) => ({
        color: player.color,
        id: player.id,
        name: player.name,
      }));

      const addToPlayers = ctx.db
        .insert(player)
        .values(playerValues)
        .returning();

      const [gameResults, turnResults, rankingResults, playerResults] =
        await Promise.all([
          addToGames,
          addToTurns,
          addToRankings,
          addToPlayers,
        ]);

      return {
        gameResults,
        turnResults,
        rankingResults,
        playerResults,
      };
    }),

  gameExists: publicProcedure
    .input(z.string().cuid2())
    .query(async ({ ctx, input }) => {
      const gameExists = await ctx.db
        .select()
        .from(games)
        .where(eq(games.id, input));

      if (gameExists.length > 0) {
        return true;
      }
      return false;
    }),
});
