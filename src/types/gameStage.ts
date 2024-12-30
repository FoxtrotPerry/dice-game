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

export const stageToRouteMap = {
  [gameStage.SETUP]: "/setup",
  [gameStage.FIRST_ROLL]: "/first-roll",
  [gameStage.REGULATION]: "/game",
  [gameStage.FINAL_ROLLS]: "/game",
  [gameStage.GAME_OVER]: "/game-over",
} as const;

export type StageBoundRoute =
  (typeof stageToRouteMap)[keyof typeof stageToRouteMap];

export type GameStage = (typeof gameStage)[keyof typeof gameStage];
