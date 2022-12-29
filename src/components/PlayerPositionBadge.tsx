import { Avatar, SxProps, Typography } from '@mui/material';
import { useGameSessionContext } from '@context';
import { useMemo } from 'react';
import { MedalColors } from '@types';

type PlayerPositionBadgeProps = {
    sx?: SxProps;
};

export const PlayerPositionBadge = ({ sx }: PlayerPositionBadgeProps) => {
    const gameSession = useGameSessionContext();

    const playerPosition = useMemo(() => {
        const currentPlayer = gameSession.players[gameSession.gameState.playersTurn];
        if (gameSession.players.every((p) => p.score === 0)) return '-';
        return (
            gameSession.players
                .sort((a, b) => (a > b ? -1 : 1))
                .findIndex((p) => p.id === currentPlayer.id) + 1
        );
    }, [gameSession.gameState.playersTurn, gameSession.players]);

    const badgeColor = useMemo(() => {
        switch (playerPosition) {
            case 1:
                return MedalColors.GOLD;
            case 2:
                return MedalColors.SILVER;
            case 3:
                return MedalColors.BRONZE;
            default:
                return MedalColors.DNP;
        }
    }, [playerPosition]);

    return (
        <Avatar
            sx={{
                height: 30,
                width: 30,
                backgroundColor: badgeColor,
                border: '2px solid #0007',
                ...sx,
            }}
        >
            <Typography fontFamily="Roboto">{playerPosition}</Typography>
        </Avatar>
    );
};
