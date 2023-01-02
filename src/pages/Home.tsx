import { Stack, Typography } from '@mui/material';
import { useGameSessionContext } from '@context';
import { GameStage } from '@types';
import { InitialDiceRoll, MainGameLoop, Victory } from '@components/game';
import { NewGameButton } from '@components';

export const Home = () => {
    const gameSession = useGameSessionContext();
    switch (gameSession.gameState.stage) {
        case GameStage.FIRST_ROLL:
            return <InitialDiceRoll />;
        case GameStage.REGULATION:
        case GameStage.FINAL_ROLLS:
            return <MainGameLoop />;
        case GameStage.GAME_OVER:
            return <Victory />;
        default:
            return (
                <Stack justifyContent="center" height="100%">
                    <Typography variant="h3" align="center">
                        <i>THE 5 DICE GAME!</i>
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <NewGameButton />
                    </div>
                    <Typography variant="h4" align="center">
                        CLICK THE DIE TO
                    </Typography>
                    <Typography variant="h1" align="center">
                        START
                    </Typography>
                </Stack>
            );
    }
};
