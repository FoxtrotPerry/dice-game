import { Box, IconButton, Typography } from '@mui/material';
import { InitialDiceRoll, MainGameLoop } from '@components/game';
import { GameStage, useGameSessionContext } from '@context';

import CasinoIcon from '@mui/icons-material/Casino';

export const Home = () => {
    const gameSession = useGameSessionContext();
    // return <Stack>Home page</Stack>;
    switch (gameSession.gameState.stage) {
        case GameStage.FIRST_ROLL:
            return <InitialDiceRoll />;
        case GameStage.MAIN_GAME:
            return <MainGameLoop />;
        default:
            // return <InitialDiceRoll />;
            return (
                /* TODO: Find a way to center the text while having the footer appear at the bottom */
                <Box
                    component="div"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                >
                    <Typography variant="h5" align="center">
                        TO START A NEW GAME,
                    </Typography>
                    <Typography variant="h3" align="center">
                        CLICK THE DIE
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            onClick={() => {
                                undefined;
                            }}
                        >
                            <CasinoIcon
                                sx={{
                                    height: '8rem',
                                    width: '8rem',
                                    animation: `rotate 3500ms infinite`,
                                    '@keyframes rotate': {
                                        '0%': {
                                            transform: `rotate(0deg)`,
                                        },
                                        '50%': {
                                            transform: `rotate(0deg)`,
                                        },
                                        '66%': {
                                            transform: `rotate(-25deg)`,
                                        },
                                        '85%': {
                                            transform: `rotate(375deg)`,
                                        },
                                        '100%': {
                                            transform: `rotate(360deg)`,
                                        },
                                    },
                                }}
                            />
                        </IconButton>
                    </div>
                </Box>
            );
    }
};
