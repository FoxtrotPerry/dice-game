export const gameStages = [
  /** Default stage. Used when creating players. */
  "SETUP",
  /** First stage of the game. Used when players roll to see who gets to go first. */
  "FIRST_ROLL",
  /** Second stage of the game. Used when normal game is taking place. */
  "REGULATION",
  /**
   * Final stage of game before Game Over. Used when every player has one last chance to
   * beat the player who just met or surpassed the winning score threshold.
   */
  "FINAL_ROLLS",
  "GAME_OVER",
] as const;

export type GameStage = (typeof gameStages)[number];

export const stageToRouteMap: Record<GameStage, string> = {
  SETUP: "/setup",
  FIRST_ROLL: "/first-roll",
  REGULATION: "/game",
  FINAL_ROLLS: "/game",
  GAME_OVER: "/game-over",
} as const;
