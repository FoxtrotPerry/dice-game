export type TurnEntry = {
  /**
   * The points the player earned this turn.
   */
  earned: number;
  /**
   * The total score the player has after this turn.
   */
  total: number;
  /**
   * Whether or not the player got on the board this turn.
   */
  gotOnTheBoardThisTurn?: boolean;
};
