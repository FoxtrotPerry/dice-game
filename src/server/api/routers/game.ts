import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  game,
  type InsertPlayer,
  type InsertTurn,
  player,
  turn,
} from "~/server/db/schema";
import { zGameState } from "~/types/gameState";
import { clerkClient } from "@clerk/nextjs/server";

export const gameRouter = createTRPCRouter({
  saveGame: publicProcedure
    .input(z.object({ gameState: zGameState, accountId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { gameState, accountId } = input;
      const addToGames = ctx.db
        .insert(game)
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

      const addToTurns = ctx.db.insert(turn).values(turnValues).returning();

      const playerValues: InsertPlayer[] = gameState.players.map((player) => {
        const rank = gameState.rankings.findIndex(
          (playerId) => player.id === playerId,
        );
        return {
          gameId: gameState.id,
          color: player.color,
          rank: rank !== -1 ? rank + 1 : rank,
          id: player.id,
          name: player.name,
          finalScore: player.score,
        };
      });

      const addToPlayers = ctx.db
        .insert(player)
        .values(playerValues)
        .returning();

      const [gameResults, turnResults, playerResults] = await Promise.all([
        addToGames,
        addToTurns,
        addToPlayers,
      ]).catch((reason: string) => {
        throw Error(reason ?? "Unspecified error");
      });

      return {
        gameResults,
        turnResults,
        playerResults,
      };
    }),

  gameExists: publicProcedure
    .input(z.string().cuid2())
    .query(async ({ ctx, input }) => {
      const gameExists = await ctx.db
        .select()
        .from(game)
        .where(eq(game.id, input));

      if (gameExists.length > 0) {
        return true;
      }
      return false;
    }),

  getGame: publicProcedure
    .input(z.string().cuid2())
    .query(async ({ ctx, input }) => {
      const resp = await ctx.db.query.game.findFirst({
        with: {
          players: {
            with: {
              playerTurns: true,
            },
            orderBy: (players, { asc }) => [asc(players.rank)],
          },
          turns: true,
        },
        where: (games, { eq }) => eq(games.id, input),
      });
      if (!resp) throw Error(`Could not find game with id: ${input}}`);
      const userResp = await (
        await clerkClient()
      ).users.getUser(resp.accountId);
      const { username, imageUrl } = userResp;
      return { game: resp, userDetails: { username, imageUrl } };
    }),

  getUsersGames: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // TODO: Validate that this query works
      const resp = await ctx.db.query.game.findMany({
        with: {
          players: true,
          turns: true,
        },
        where: (games, { eq }) => eq(games.accountId, input.userId),
      });
      return resp;
    }),
});
