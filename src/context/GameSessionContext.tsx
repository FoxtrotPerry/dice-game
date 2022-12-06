import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useState,
} from 'react';

type GameSessionContextProps = {
    children: ReactNode;
};

export type Player = {
    name: string;
    id: number;
    score: number;
    outOfTheGate: boolean;
};

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

type GameState = {
    stage: GameStage;
    gameInProgress: boolean;
    playersTurn: number;
};

type GameSessionContext = {
    players: Player[];
    gameState: GameState;
    updateGameState: (partialGameState: Partial<GameState>) => void;
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    resetPlayers: () => void;
    resetGameStateAndScores: () => void;
    changeNumOfPlayers: (n: number) => void;
    updatePlayer: (id: number, partial: Partial<Player>) => void;
};

const PLAYER_TEMPLATE: Player = { id: 0, name: 'Player ', score: 0, outOfTheGate: false };

const DEFAULT_PLAYERS: Player[] = [
    { id: 0, name: 'Player 1', score: 0, outOfTheGate: false },
    { id: 1, name: 'Player 2', score: 0, outOfTheGate: false },
];

const DEFAULT_GAME_STATE = {
    stage: GameStage.SETUP,
    gameInProgress: false,
    playersTurn: 0,
};

/*
    We instantiate the functions to dummy functions that way we don't need to do undefined checks later
    when we go to actually use the real thing.
*/
const GameSessionContextInstance = createContext<GameSessionContext>({
    players: DEFAULT_PLAYERS,
    gameState: DEFAULT_GAME_STATE,
    updateGameState: () => {
        throw new Error('How did you even use this updateGameState() placeholder function?');
    },
    setPlayers: () => {
        throw new Error('How did you even use this setPlayers() placeholder function?');
    },
    resetPlayers: () => {
        throw new Error('How did you even use this resetPlayers() placeholder function?');
    },
    resetGameStateAndScores: () => {
        throw new Error('How did you even use this resetGameStateAndScores() placeholder function?');
    },
    changeNumOfPlayers: () => {
        throw new Error('How did you even use this changeNumOfPlayers() placeholder function?');
    },
    updatePlayer: () => {
        throw new Error('How did you even use this updatePlayer() placeholder function?');
    },
});

export const useGameSessionContext = () => {
    const c = useContext(GameSessionContextInstance);
    if (c) return c;
    throw new Error(
        'useGameSessionContext() must be called within the scope of a GameSessionContext provider component.'
    );
};

export const GameSessionContextProvider = ({ children }: GameSessionContextProps) => {
    const c = useContext(GameSessionContextInstance);
    const [players, setPlayers] = useState(c.players);
    const [gameState, setGameState] = useState(c.gameState);

    const resetPlayers = useCallback(() => {
        setPlayers(DEFAULT_PLAYERS);
    }, [setPlayers]);

    const resetGameStateAndScores = useCallback(() => {
        setPlayers(players.map((p) => ({ ...p, score: 0 })));
        setGameState(DEFAULT_GAME_STATE);
    }, [players]);

    const addPlayers = useCallback(
        (numOfNewPlayers: number) => {
            const currPlayerLen = players.length;
            const newPlayerAdditions = [...Array(numOfNewPlayers)].map((nothing, i) => {
                const newPlayerId = currPlayerLen + i;
                return {
                    ...PLAYER_TEMPLATE,
                    name: PLAYER_TEMPLATE.name + (newPlayerId + 1).toString(),
                    id: newPlayerId,
                };
            });
            setPlayers([...players, ...newPlayerAdditions]);
        },
        [players]
    );

    const changeNumOfPlayers = useCallback(
        (newTotalNumOfPlayers: number) => {
            if (newTotalNumOfPlayers > players.length) {
                addPlayers(newTotalNumOfPlayers - players.length);
            } else if (newTotalNumOfPlayers < players.length) {
                setPlayers(players.slice(0, newTotalNumOfPlayers));
            }
        },
        [addPlayers, players]
    );

    const updatePlayer = useCallback(
        (playerId: number, partialPlayer: Partial<Player>) => {
            const newPlayersArr = players;
            newPlayersArr[playerId] = {
                ...newPlayersArr[playerId],
                ...partialPlayer,
            };
            setPlayers(newPlayersArr);
        },
        [players]
    );

    const updateGameState = useCallback(
        (partialGameState: Partial<GameState>) => {
            setGameState({ ...gameState, ...partialGameState });
        },
        [gameState]
    );

    return (
        <GameSessionContextInstance.Provider
            value={{
                players,
                gameState,
                updateGameState,
                setPlayers,
                resetPlayers,
                resetGameStateAndScores,
                changeNumOfPlayers,
                updatePlayer,
            }}
        >
            {children}
        </GameSessionContextInstance.Provider>
    );
};
