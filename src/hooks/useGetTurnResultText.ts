import { useGameSessionContext } from '@context/GameSessionContext';
import { PlayerTurnResult } from '@types';
import { useCallback } from 'react';

export const useGetTurnResultText = () => {
    const session = useGameSessionContext();
    return useCallback(
        (tr: PlayerTurnResult) => {
            const player = session.players[tr.playerId].name;
            if (tr.turnEntry.gotOnTheBoardThisTurn !== undefined) {
                return `${player} ${
                    tr.turnEntry.gotOnTheBoardThisTurn ? 'Got' : "Didn't get"
                } on the board.`;
            }
            return `${player} Earned: ${tr.turnEntry.earned} Total: ${tr.turnEntry.total}`;
        },
        [session.players]
    );
};
