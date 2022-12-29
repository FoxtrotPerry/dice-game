import { Dispatch, SetStateAction } from 'react';

export enum GameStage {
    /** Default stage. Used when creating players. */
    SETUP = 'SETUP',
    /** First stage of the game. Used when deciding whose turn it is first. */
    FIRST_ROLL = 'FIRST_ROLL',
    /** Second stage of the game. Used when normal game is taking place. */
    MAIN_GAME = 'MAIN_GAME',
    /** Final stage of game. Used when every player has one last chance to
     * beat the player who just met or surpassed the winning score threshold.
     */
    FINAL_ROLLS = 'FINAL_ROLLS',
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
    SILVER = '#C0C0C0',
    BRONZE = '#CD7F32',
    // Did Not Place
    DNP = '#A2A2A2',
}

export type Player = {
    name: string;
    id: number;
    score: number;
    color: PlayerColor;
    onTheBoard: boolean;
    isPlayersTurn: boolean;
};

export type GameState = {
    stage: GameStage;
    gameInProgress: boolean;
    playersTurn: number;
};

export type GameSessionContext = {
    players: Player[];
    gameState: GameState;
    updateGameState: (partialGameState: Partial<GameState>) => void;
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    resetPlayers: () => void;
    resetGameStateAndScores: () => void;
    changeNumOfPlayers: (n: number) => void;
    updatePlayer: (id: number, partial: Partial<Player>) => void;
    endTurn: () => void;
};
