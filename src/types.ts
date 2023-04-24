import { Dispatch, SetStateAction } from 'react';

export enum GameStage {
    /** Default stage. Used when creating players. */
    SETUP = 'SETUP',
    /** First stage of the game. Used when deciding whose turn it is first. */
    FIRST_ROLL = 'FIRST_ROLL',
    /** Second stage of the game. Used when normal game is taking place. */
    REGULATION = 'REGULATION',
    /** Final stage of game. Used when every player has one last chance to
     * beat the player who just met or surpassed the winning score threshold.
     */
    FINAL_ROLLS = 'FINAL_ROLLS',
    GAME_OVER = 'GAME_OVER',
}

export enum PlayerColor {
    PINK = '#FFCCF9',
    RED = '#FFABAB',
    ORANGE = '#FFCBC1',
    YELLOW = '#FFFFD1',
    MINT = '#AFF8DB',
    CYAN = '#C4FAF8',
    BLUE = '#6EB5FF',
    PURPLE = '#B28DFF',
    SLATE = '#D7EEFF',
    VANILLA = '#E5DBD9',
}

export enum MedalColors {
    GOLD = '#FFD700',
    SILVER = '#E0E0F0',
    BRONZE = '#CD7F32',
    // Did Not Place
    DNP = '#A2A2A2',
}

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

export type Player = {
    name: string;
    id: number;
    score: number;
    scoreHistory: TurnEntry[];
    place?: number;
    color: PlayerColor;
    onTheBoard: boolean;
    isPlayersTurn: boolean;
};

export type PartialPlayerUpdate = Partial<Pick<Player, 'id' | 'onTheBoard' | 'place' | 'score'>>;

export type PlayerTurnResult = {
    playerId: number;
    playerUpdate?: PartialPlayerUpdate;
    turnEntry: TurnEntry;
};

export type GameState = {
    stage: GameStage;
    gameInProgress: boolean;
    playersTurn: number;
};

export type GameSessionContext = {
    players: Player[];
    gameState: GameState;
    turnResults: PlayerTurnResult[];
    firstPlayerPastScoreGoal?: number;
    winnerId?: number;
    updateGameState: (partialGameState: Partial<GameState>) => void;
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    resetPlayers: () => void;
    resetGameStateAndScores: () => void;
    changeNumOfPlayers: (n: number) => void;
    updatePlayer: (id: number, partial: Partial<Player>) => void;
    endTurn: (playerTurnResult: PlayerTurnResult) => void;
    undoLastTurn: () => void;
    addTurnResult: (result: PlayerTurnResult) => void;
};
