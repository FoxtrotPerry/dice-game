import { useMemo } from 'react';
import { alpha, Avatar, Typography, useTheme } from '@mui/material';
import { Player } from '@types';
import { Pinging } from '@components';

type PlayerAvatarProps = {
    player: Player;
    style?: React.CSSProperties;
};

export const PlayerAvatar = ({ player, style }: PlayerAvatarProps) => {
    const theme = useTheme();
    const { isPlayersTurn } = player;

    const playerInitials = useMemo(() => {
        const splitName = player.name.split(' ');
        const optionalSecondInitial = splitName?.at(1)?.at(0);
        return optionalSecondInitial ? splitName[0][0] + optionalSecondInitial : splitName[0][0];
    }, [player.name]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...style,
            }}
        >
            <Pinging
                disabled={!isPlayersTurn}
                CircularPulseProps={{
                    scale: 4,
                    endPulseScale: 1.5,
                }}
                pingColor={player.color ? player.color : alpha(theme.palette.action.active, 0.6)}
            >
                <Avatar
                    sx={{
                        width: isPlayersTurn ? theme.spacing(12) : theme.spacing(8),
                        height: isPlayersTurn ? theme.spacing(12) : theme.spacing(8),
                        fontSize: '2rem',
                        bgcolor: player.color,
                        border: '3px solid #0003',
                    }}
                >
                    <Typography
                        variant={isPlayersTurn ? 'h2' : 'h4'}
                        sx={{ textShadow: '0px 1px 5px #000000aa' }}
                    >
                        {playerInitials}
                    </Typography>
                </Avatar>
            </Pinging>
        </div>
    );
};
