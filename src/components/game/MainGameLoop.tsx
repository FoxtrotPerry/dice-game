import { useGameSessionContext } from '@context/GameSessionContext';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { EasingIcon, Footer } from '@components';
import { usePreferenceContext } from '@context/PreferenceContext';

export const MainGameLoop = () => {
    const gameSession = useGameSessionContext();
    const { theme } = usePreferenceContext();
    return (
        <>
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <EasingIcon
                    scale={3}
                    easeOutScale={1.25}
                    loopMs={2000}
                    pingColor={theme.palette.info.main}
                >
                    <Avatar sx={{ width: 64, height: 64, fontSize: '2rem', bgcolor: 'cyan' }}>
                        {gameSession.players.at(gameSession.gameState.playersTurn)?.name.charAt(0)}
                        {gameSession.players.at(gameSession.gameState.playersTurn)?.name.charAt(0)}
                    </Avatar>
                </EasingIcon>
            </Box>
            <Footer>
                <Button variant="contained" size="large">
                    <Typography>{`End Turn`}</Typography>
                </Button>
            </Footer>
        </>
    );
};
