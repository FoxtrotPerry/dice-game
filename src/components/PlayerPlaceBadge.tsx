import { Avatar, SxProps, Typography } from '@mui/material';
import { useMemo } from 'react';
import { MedalColors, Player } from '@types';

type PlayerPlaceBadgeProps = {
    player: Player;
    sx?: SxProps;
};

export const PlayerPlaceBadge = ({ player, sx }: PlayerPlaceBadgeProps) => {
    const badgeColor = useMemo(() => {
        switch (player.place) {
            case 1:
                return MedalColors.GOLD;
            case 2:
                return MedalColors.SILVER;
            case 3:
                return MedalColors.BRONZE;
            default:
                return MedalColors.DNP;
        }
    }, [player.place]);

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
            <Typography fontFamily="Roboto">{player.place || '-'}</Typography>
        </Avatar>
    );
};
