import { useEffect, useState } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { useRouteToGameWizard } from '@hooks/routerHooks';

import CasinoIcon from '@mui/icons-material/Casino';
import { getRandomColor } from '@context/GameSessionContext';

const loopTimeMs = 4000;

export const NewGameButton = () => {
    const theme = useTheme();
    const [color, setColor] = useState(getRandomColor());
    const [intervalId, setIntervalId] = useState(0);

    useEffect(() => {
        setIntervalId(setInterval(() => setColor(getRandomColor()), loopTimeMs));
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <IconButton size="large" onClick={useRouteToGameWizard()}>
            <CasinoIcon
                sx={{
                    color: theme.palette.text.primary,
                    height: '8rem',
                    width: '8rem',
                    filter: 'drop-shadow(0 0 0.2rem #0009)',
                    animation: `rotate ${loopTimeMs}ms infinite`,
                    '@keyframes rotate': {
                        '0%': {
                            transform: `rotate(0deg)`,
                        },
                        '15%': {
                            transform: `rotate(-25deg)`,
                            color: color,
                        },
                        '50%': {
                            transform: 'rotate(375deg)',
                        },
                        '60%': {
                            transform: 'rotate(360deg)',
                        },
                        '90%': {
                            color: theme.palette.text.primary,
                        },
                        '100%': {
                            transform: 'rotate(360deg)',
                        },
                    },
                }}
            />
        </IconButton>
    );
};
