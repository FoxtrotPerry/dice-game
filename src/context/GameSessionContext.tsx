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

type Player = {
    name: string;
    id: number;
    score: number;
};

type GameSessionContext = {
    players: Player[];
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    resetPlayers: () => void;
    changeNumOfPlayers: (n: number) => void;
    editPlayer: (id: number, partial: Partial<Player>) => void;
};

const PLAYER_TEMPLATE: Player = { id: 0, name: 'Player ', score: 0 };

const DEFAULT_PLAYERS: Player[] = [
    { id: 0, name: 'Player 1', score: 0 },
    { id: 1, name: 'Player 2', score: 0 },
];

/*
    We instantiate the functions to dummy functions that way we don't need to do undefined checks later
    when we go to actually use the real thing.
*/
const GameSessionContextInstance = createContext<GameSessionContext>({
    players: DEFAULT_PLAYERS,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPlayers: (players: SetStateAction<Player[]>) => {
        throw new Error('How did you even use this setPlayers() placeholder function?');
    },
    resetPlayers: () => {
        throw new Error('How did you even use this resetPlayers() placeholder function?');
    },
    changeNumOfPlayers: () => {
        throw new Error('How did you even use this changeNumOfPlayers() placeholder function?');
    },
    editPlayer: () => {
        throw new Error('How did you even use this editPlayer() placeholder function?');
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

    const resetPlayers = useCallback(() => {
        setPlayers(DEFAULT_PLAYERS);
    }, [setPlayers]);

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

    const editPlayer = useCallback(
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

    return (
        <GameSessionContextInstance.Provider
            value={{ players, setPlayers, resetPlayers, changeNumOfPlayers, editPlayer }}
        >
            {children}
        </GameSessionContextInstance.Provider>
    );
};
