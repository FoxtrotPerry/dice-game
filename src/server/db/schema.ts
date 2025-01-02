// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `five-dice_${name}`);

export const posts = createTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const games = createTable("game", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const turns = createTable(
  "turn",
  {
    gameId: text("game_id").notNull(),
    turnId: integer("turn_id").notNull(),
    playerId: text("player_id").notNull(),
    earned: integer("earned").notNull(),
    newTotal: integer("new_total").notNull(),
    gotOnBoardThisTurn: boolean("got_on_board_this_turn")
      .default(false)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.gameId, table.turnId] }),
  }),
);

export const ranking = createTable("ranking", {
  gameId: text("game_id").notNull(),
  playerId: text("player_id").notNull(),
  rank: integer("rank").notNull(),
});

export const player = createTable("player", {
  id: text("id").notNull(),
  name: text("name").notNull(),
  color: text("color").notNull(),
});
