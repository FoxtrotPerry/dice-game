export const gameStage = {
  /** Default stage. Used when creating players. */
  SETUP: "SETUP",
  /** First stage of the game. Used when players roll to see who gets to go first. */
  FIRST_ROLL: "FIRST_ROLL",
  /** Second stage of the game. Used when normal game is taking place. */
  REGULATION: "REGULATION",
  /** Final stage of game before Game Over. Used when every player has one last chance to
   * beat the player who just met or surpassed the winning score threshold.
   */
  FINAL_ROLLS: "FINAL_ROLLS",
  GAME_OVER: "GAME_OVER",
} as const;
