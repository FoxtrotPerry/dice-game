import { Box, Typography } from '@mui/material';
import { InitialDiceRoll, MainGameLoop } from '@components/game';
import { GameStage, useGameSessionContext } from '@context';

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
                    <Typography align="center">
                        To start a new game, click the new game button at the top!
                    </Typography>
                </Box>
            );
    }
};
