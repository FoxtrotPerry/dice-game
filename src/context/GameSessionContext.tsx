import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import {
    GameSessionContext,
    GameStage,
    GameState,
    Player,
    PlayerColor,
    PlayerTurnResult,
} from '@types';

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

const PLAYER_SCORE_FIELDS: Pick<Player, 'score' | 'scoreHistory' | 'onTheBoard'> = {
    score: 0,
    scoreHistory: [],
    onTheBoard: false,
};

const PLAYER_TEMPLATE: Player = {
    id: 0,
    name: 'Player ',
    color: PlayerColor.SLATE,
    isPlayersTurn: false,
    ...PLAYER_SCORE_FIELDS,
};

const DEFAULT_PLAYERS: Player[] = [
    {
        id: 0,
        name: 'Player 1',
        color: Object.values(PlayerColor)[0],
        isPlayersTurn: false,
        ...PLAYER_SCORE_FIELDS,
    },
    {
        id: 1,
        name: 'Player 2',
        color: Object.values(PlayerColor)[1],
        isPlayersTurn: false,
        ...PLAYER_SCORE_FIELDS,
    },
];

const DEFAULT_GAME_STATE = {
    stage: GameStage.SETUP,
    gameInProgress: false,
    playersTurn: 0,
};

const throwPrematureExecutionError = (funcName: string) => {
    return () => {
        throw new Error(
            `Placeholder ${funcName} function used before proper instantiation. Check where you have used ${funcName}.`
        );
    };
};

/*
    We instantiate the functions to dummy functions that way we don't need to do undefined checks later
    when we go to utilize the properties of the context object.
*/
const GameSessionContextInstance = createContext<GameSessionContext>({
    players: DEFAULT_PLAYERS,
    gameState: DEFAULT_GAME_STATE,
    turnResults: [],
    firstPlayerPastScoreGoal: undefined,
    winnerId: undefined,
    updateGameState: throwPrematureExecutionError('updateGameState'),
    setPlayers: throwPrematureExecutionError('setPlayers'),
    resetPlayers: throwPrematureExecutionError('resetPlayers'),
    resetGameStateAndScores: throwPrematureExecutionError('resetGameStateAndScores'),
    changeNumOfPlayers: throwPrematureExecutionError('changeNumOfPlayers'),
    updatePlayer: throwPrematureExecutionError('updatePlayer'),
    endTurn: throwPrematureExecutionError('endTurn'),
    undoLastTurn: throwPrematureExecutionError('undoLastTurn'),
    addTurnResult: throwPrematureExecutionError('addTurnResult'),
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
    // List of player states after turn at index was completed
    const [turnResults, setTurnResults] = useState<PlayerTurnResult[]>([]);
    const [gameState, setGameState] = useState(c.gameState);
    const [firstPlayerPastScoreGoalId, setFirstPlayerPastScoreGoalId] = useState<number>();
    const [winnerId, setWinnerId] = useState<number>();
    //TODO: Allow the user to set a custom goal.
    const [goal, setGoal] = useState(10000);

    const resetPlayers = useCallback(() => {
        setPlayers(DEFAULT_PLAYERS);
    }, [setPlayers]);

    /**
     * Resets the game state and all player scores and other game data to 0.
     * All non game related data is retained.
     */
    const resetGameStateAndScores = useCallback(() => {
        setPlayers(
            players.map((p) => ({
                ...p,
                score: 0,
                place: undefined,
                isPlayersTurn: false,
                onTheBoard: false,
            }))
        );
        setWinnerId(undefined);
        setFirstPlayerPastScoreGoalId(undefined);
        setGameState(DEFAULT_GAME_STATE);
        setTurnResults([]);
    }, [players]);

    const getCurrentPlayer = useCallback(() => {
        return players[gameState.playersTurn];
    }, [gameState.playersTurn, players]);

    const getNextPlayer = useCallback(() => {
        return players[(gameState.playersTurn + 1) % players.length];
    }, [gameState.playersTurn, players]);

    const getPreviousPlayer = useCallback(() => {
        return players.at(gameState.playersTurn - 1);
    }, [gameState.playersTurn, players]);

    /**
     * Adds the provided number of players to the game.
     */
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

    /**
     * Changes the total number of players in the game to the provided number.
     */
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

    /**
     * Updates the player with the provided id with the provided partial player.
     */
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

    /**
     * Updates the game state with the provided partial game state.
     */
    const updateGameState = useCallback(
        (partialGameState: Partial<GameState>) => {
            setGameState({ ...gameState, ...partialGameState });
        },
        [gameState]
    );

    /**
     * Sets the player's turn to true and sets all other players' turns to false.
     */
    const makePlayersTurn = useCallback((playerId: Player['id']) => {
        setPlayers((players) => {
            return players.map((p) => {
                return {
                    ...p,
                    isPlayersTurn: p.id === playerId ? true : false,
                };
            });
        });
    }, []);

    /**
     * Adds a player's turn result to the turn results list.
     */
    const addTurnResult = useCallback((newTurnResult: PlayerTurnResult) => {
        setTurnResults((currentTurnResults) => {
            return [...currentTurnResults, newTurnResult];
        });
    }, []);

    /**
     * Removes the last turn result from the turn results list.
     */
    const removeLastTurnResult = useCallback(() => {
        setTurnResults((currentTurnResults) => {
            return currentTurnResults.slice(0, -1);
        });
    }, []);

    /**
     * Undo the last turn and revert the player's state to what it was before the turn was made.
     */
    const undoLastTurn = useCallback(() => {
        const previousPlayer = getPreviousPlayer();
        if (!previousPlayer) throw new Error('Could not find previous player when going back a turn');
        updateGameState({ playersTurn: previousPlayer.id });
        // Get the previous player's last turn entry
        const previousPlayersLastTurnEntry = previousPlayer.scoreHistory.at(-1);
        // Make a new partial player state instantiated with default score fields
        const rolledBackPreviousPlayerState = PLAYER_SCORE_FIELDS;
        // If the previous player's last turn entry exists...
        if (previousPlayersLastTurnEntry !== undefined) {
            // ...then use it to inform us of what the previous player's state should be

            // ON THE BOARD
            // If the previous player's last turn entry was spent getting on the board
            if (previousPlayersLastTurnEntry.gotOnTheBoardThisTurn) {
                // then set the player's onTheBoard field to false because regardless of whether
                // the player successfully made it on the board, that result is now retracted.
                rolledBackPreviousPlayerState.onTheBoard = false;
            } else {
                // Otherwise, retain the previous player's onTheBoard state
                rolledBackPreviousPlayerState.onTheBoard = previousPlayer.onTheBoard;
            }

            // SCORE
            rolledBackPreviousPlayerState.score =
                previousPlayersLastTurnEntry.total - previousPlayersLastTurnEntry.earned;

            // LAST TURN ENTRY
            rolledBackPreviousPlayerState.scoreHistory = previousPlayer.scoreHistory.slice(0, -1) ?? [];
        }
        updatePlayer(previousPlayer.id, rolledBackPreviousPlayerState);
        removeLastTurnResult();
        makePlayersTurn(previousPlayer.id);
    }, [getPreviousPlayer, makePlayersTurn, removeLastTurnResult, updateGameState, updatePlayer]);

    const endTurn = useCallback(
        (turnResult: PlayerTurnResult) => {
            addTurnResult(turnResult);
            const nextPlayer = getNextPlayer();
            updatePlayer(turnResult.playerId, {
                ...turnResult.playerUpdate,
                scoreHistory: [...getCurrentPlayer().scoreHistory, turnResult.turnEntry],
            });
            if (nextPlayer.id === firstPlayerPastScoreGoalId) {
                updateGameState({ stage: GameStage.GAME_OVER });
            } else {
                updateGameState({ playersTurn: nextPlayer.id });
                makePlayersTurn(nextPlayer.id);
            }
        },
        [
            addTurnResult,
            firstPlayerPastScoreGoalId,
            getCurrentPlayer,
            getNextPlayer,
            makePlayersTurn,
            updateGameState,
            updatePlayer,
        ]
    );

    // Make sure that we catch when a player goes over the score goal so we can
    // Notify that the next roll everyone makes will be their last chance to beat
    // the player in first place
    useEffect(() => {
        const outPlayer = players.find((p) => p.score >= goal);
        // If we're in the regulation stage and a player goes over the score goal
        if (gameState.stage === GameStage.REGULATION && outPlayer && !firstPlayerPastScoreGoalId) {
            // then set the first player to go over the score goal
            // and move to the final rolls stage
            setFirstPlayerPastScoreGoalId(outPlayer.id);
            updateGameState({ stage: GameStage.FINAL_ROLLS });
            setWinnerId(outPlayer.id);
        } else if (
            gameState.stage === GameStage.FINAL_ROLLS &&
            !outPlayer &&
            firstPlayerPastScoreGoalId
        ) {
            setFirstPlayerPastScoreGoalId(undefined);
            updateGameState({ stage: GameStage.REGULATION });
            setWinnerId(undefined);
        }
    }, [firstPlayerPastScoreGoalId, gameState, getNextPlayer, goal, players, updateGameState]);

    return (
        <GameSessionContextInstance.Provider
            value={{
                players,
                gameState,
                turnResults,
                firstPlayerPastScoreGoal: firstPlayerPastScoreGoalId,
                winnerId: winnerId,
                updateGameState,
                setPlayers,
                resetPlayers,
                resetGameStateAndScores,
                changeNumOfPlayers,
                updatePlayer,
                endTurn,
                undoLastTurn,
                addTurnResult,
            }}
        >
            {children}
        </GameSessionContextInstance.Provider>
    );
};
