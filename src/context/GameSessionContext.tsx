import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import { GameSessionContext, GameStage, GameState, Player, PlayerColor } from '@types';

type GameSessionContextProps = {
    children: ReactNode;
};

export const getRandomColor = () => {
    return Object.values(PlayerColor)[Math.floor(Math.random() * Object.values(PlayerColor).length)];
};

export const playerColorOptions = Object.entries(PlayerColor).map(([label, color]) => {
    return {
        label,
        color,
    };
});

const PLAYER_TEMPLATE: Player = {
    id: 0,
    name: 'Player ',
    score: 0,
    color: PlayerColor.SLATE,
    onTheBoard: false,
    isPlayersTurn: false,
};

const DEFAULT_PLAYERS: Player[] = [
    {
        id: 0,
        name: 'Player 1',
        score: 0,
        color: Object.values(PlayerColor)[0],
        onTheBoard: false,
        isPlayersTurn: false,
    },
    {
        id: 1,
        name: 'Player 2',
        score: 0,
        color: Object.values(PlayerColor)[1],
        onTheBoard: false,
        isPlayersTurn: false,
    },
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
        throw new Error('How did you manage to use this updateGameState() placeholder function?');
    },
    setPlayers: () => {
        throw new Error('How did you manage to use this setPlayers() placeholder function?');
    },
    resetPlayers: () => {
        throw new Error('How did you manage to use this resetPlayers() placeholder function?');
    },
    resetGameStateAndScores: () => {
        throw new Error(
            'How did you manage to use this resetGameStateAndScores() placeholder function?'
        );
    },
    changeNumOfPlayers: () => {
        throw new Error('How did you manage to use this changeNumOfPlayers() placeholder function?');
    },
    updatePlayer: () => {
        throw new Error('How did you manage to use this updatePlayer() placeholder function?');
    },
    endTurn: () => {
        throw new Error('How did you manage to use this endTurn() placeholder function?');
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
                    color: Object.values(PlayerColor)[newPlayerId],
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

    // TODO: Check if partial player contains a score attribute and
    // resort the standings if found.
    const updatePlayer = useCallback(
        (playerId: number, partialPlayer: Partial<Player>) => {
            // passing in an edited version of the players
            // array as such to ensure a re-render is provoked
            setPlayers([
                ...players.slice(0, playerId),
                { ...players[playerId], ...partialPlayer },
                ...players.slice(playerId + 1),
            ]);
        },
        [players]
    );

    const endTurn = useCallback(() => {
        setGameState({ ...gameState, playersTurn: (gameState.playersTurn + 1) % players.length });
    }, [gameState, players.length]);

    const updateGameState = useCallback(
        (partialGameState: Partial<GameState>) => {
            setGameState({ ...gameState, ...partialGameState });
        },
        [gameState]
    );

    // If the number assigned to the player who's turn it currently is changes,
    // make sure to update the players to this change is in sync with all players
    useEffect(() => {
        setPlayers((players) => {
            return players.map((p) => {
                return {
                    ...p,
                    isPlayersTurn: p.id === gameState.playersTurn ? true : false,
                };
            });
        });
    }, [gameState.playersTurn]);

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
                endTurn,
            }}
        >
            {children}
        </GameSessionContextInstance.Provider>
    );
};
