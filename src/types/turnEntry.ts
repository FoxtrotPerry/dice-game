export type TurnEntry = {
  /**
   * The player's id.
   */
  playerId: string;
  /**
   * The points the player earned this turn.
   */
  earned: number;
  /**
   * The total score the player has after this turn.
   */
  newTotal: number;
  /**
   * Whether or not the player got on the board this turn.
   */
  gotOnTheBoardThisTurn: boolean;
};
