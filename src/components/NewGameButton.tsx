import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { useRouteToGameWizard } from '@hooks/routerHooks';

import CasinoIcon from '@mui/icons-material/Casino';
import { getRandomColor } from '@context/GameSessionContext';

const loopTimeMs = 4000;

export const NewGameButton = () => {
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
                    height: '8rem',
                    width: '8rem',
                    animation: `rotate ${loopTimeMs}ms infinite`,
                    '@keyframes rotate': {
                        '0%': {
                            transform: `rotate(0deg)`,
                        },
                        '50%': {
                            transform: `rotate(0deg)`,
                        },
                        '66%': {
                            transform: `rotate(-25deg)`,
                            color: 'inherit',
                        },
                        '85%': {
                            transform: `rotate(375deg)`,
                            color: color,
                        },
                        '100%': {
                            transform: `rotate(360deg)`,
                        },
                    },
                }}
            />
        </IconButton>
    );
};
