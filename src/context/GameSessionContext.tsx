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
    firstPlayerPastScoreGoal: undefined,
    winnerId: undefined,
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
    const [firstPlayerPastScoreGoalId, setFirstPlayerPastScoreGoalId] = useState<number>();
    const [winnerId, setWinnerId] = useState<number>();
    //TODO: Allow the user to set a custom goal.
    const [goal, setGoal] = useState(10000);

    const resetPlayers = useCallback(() => {
        setPlayers(DEFAULT_PLAYERS);
    }, [setPlayers]);

    const resetGameStateAndScores = useCallback(() => {
        setPlayers(
            players.map((p) => ({
                ...p,
                score: 0,
                place: undefined,
                isPlayersTurn: false,
            }))
        );
        setWinnerId(undefined);
        setFirstPlayerPastScoreGoalId(undefined);
        setGameState(DEFAULT_GAME_STATE);
    }, [players]);

    const getNextPlayer = useCallback(() => {
        return players[(gameState.playersTurn + 1) % players.length];
    }, [gameState.playersTurn, players]);

    const addPlayers = useCallback(
        (numOfNewPlayers: number) => {
            const currPlayerLen = players.length;
            const newPlayerAdditions = [...Array(numOfNewPlayers)].map((nothing, i) => {
                const newPlayerId: number = currPlayerLen + i;
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

    const updatePlayer = useCallback(
        (playerId: number, partialPlayer: Partial<Player>) => {
            let newPlayers = [
                ...players.slice(0, playerId),
                { ...players[playerId], ...partialPlayer },
                ...players.slice(playerId + 1),
            ];
            if (partialPlayer.score) {
                // we make a shallow copy of newPlayers with .slice()
                // so that sort() doesn't mutate newPlayers
                const sortedPlayers = newPlayers.slice().sort((a, b) => b.score - a.score);
                newPlayers = newPlayers.map((p) => {
                    return {
                        ...p,
                        place: sortedPlayers.findIndex((pl) => pl.id === p.id) + 1,
                    };
                });
                // if we're on the final rolls and the updated player
                // steals first place, then set them as the new winner.
                if (
                    gameState.stage === GameStage.FINAL_ROLLS &&
                    winnerId !== undefined &&
                    partialPlayer.score > players[winnerId]?.score
                ) {
                    setWinnerId(playerId);
                }
            }
            setPlayers(newPlayers);
        },
        [gameState.stage, players, winnerId]
    );

    const updateGameState = useCallback(
        (partialGameState: Partial<GameState>) => {
            setGameState({ ...gameState, ...partialGameState });
        },
        [gameState]
    );

    const endTurn = useCallback(() => {
        const nextPlayer = getNextPlayer();
        if (nextPlayer.id === firstPlayerPastScoreGoalId) {
            updateGameState({ stage: GameStage.GAME_OVER });
        } else {
            updateGameState({ playersTurn: nextPlayer.id });
            setPlayers((players) => {
                return players.map((p) => {
                    return {
                        ...p,
                        isPlayersTurn: p.id === nextPlayer.id ? true : false,
                    };
                });
            });
        }
    }, [firstPlayerPastScoreGoalId, getNextPlayer, updateGameState]);

    // Make sure that we catch when a player goes over the score goal so we can
    // Notify that the next roll everyone makes will be their last chance to beat
    // the player in first place
    useEffect(() => {
        const outPlayer = players.find((p) => p.score >= goal);
        if (gameState.stage === GameStage.REGULATION && outPlayer && !firstPlayerPastScoreGoalId) {
            setFirstPlayerPastScoreGoalId(outPlayer.id);
            updateGameState({ stage: GameStage.FINAL_ROLLS });
            setWinnerId(outPlayer.id);
        }
    }, [firstPlayerPastScoreGoalId, gameState, getNextPlayer, goal, players, updateGameState]);

    return (
        <GameSessionContextInstance.Provider
            value={{
                players,
                gameState,
                firstPlayerPastScoreGoal: firstPlayerPastScoreGoalId,
                winnerId: winnerId,
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
