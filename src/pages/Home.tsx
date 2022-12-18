import { Box, Typography } from '@mui/material';
import { GameStage, useGameSessionContext } from '@context';
import { InitialDiceRoll, MainGameLoop } from '@components/game';
import { NewGameButton } from '@components';

export const Home = () => {
    const gameSession = useGameSessionContext();
    switch (gameSession.gameState.stage) {
        case GameStage.FIRST_ROLL:
            return <InitialDiceRoll />;
        case GameStage.MAIN_GAME:
            return <MainGameLoop />;
        default:
            return (
                <Box
                    component="div"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-evenly"
                    width="100%"
                    height="100%"
                >
                    <div>
                        <Typography variant="h3" align="center">
                            <i>THE 5 DICE GAME!</i>
                        </Typography>
                    </div>
                    <NewGameButton />
                    <div>
                        <Typography variant="h4" align="center">
                            CLICK THE DIE TO
                        </Typography>
                        <Typography variant="h2" align="center">
                            START
                        </Typography>
                    </div>
                </Box>
            );
    }
};
