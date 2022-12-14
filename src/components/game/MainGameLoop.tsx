import { useMemo } from 'react';
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useGameSessionContext } from '@context';
import { Footer, PlayerAvatar } from '@components';

export const MainGameLoop = () => {
    const theme = useTheme();
    const gameSession = useGameSessionContext();
    const currentPlayer = gameSession.players[gameSession.gameState.playersTurn];

    const playerQueue = useMemo(() => {
        return [
            ...gameSession.players.slice(
                gameSession.gameState.playersTurn + (1 % gameSession.players.length)
            ),
            ...gameSession.players.slice(0, gameSession.gameState.playersTurn),
        ].reverse();
    }, [gameSession.gameState.playersTurn, gameSession.players]);

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
                <Stack justifyContent="center">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginBottom: theme.spacing(2),
                        }}
                    >
                        <Box sx={{ mb: 2 }}>
                            <PlayerAvatar player={currentPlayer} />
                        </Box>
                        <Typography variant="h3" align="center">
                            {`${currentPlayer.name}'s turn!`}
                        </Typography>
                    </div>
                    <Divider sx={{ mb: 2 }} />
                    <Stack direction="row" spacing={-3} justifyContent="center">
                        {playerQueue.map((p) => {
                            return <PlayerAvatar key={`player-${p.id}`} player={p} />;
                        })}
                    </Stack>
                </Stack>
            </Box>
            <Footer>
                <Button
                    onClick={() => {
                        gameSession.endTurn();
                    }}
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: currentPlayer.color }}
                >
                    <Typography>{`End Turn`}</Typography>
                </Button>
            </Footer>
        </>
    );
};
