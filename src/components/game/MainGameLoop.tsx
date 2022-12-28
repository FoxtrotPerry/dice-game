import { useCallback, useMemo, useState } from 'react';
import { Box, Button, Card, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useGameSessionContext } from '@context';
import { Numpad, NumpadAction, PlayerAvatar } from '@components';

export const MainGameLoop = () => {
    const theme = useTheme();
    const gameSession = useGameSessionContext();
    const currentPlayer = gameSession.players[gameSession.gameState.playersTurn];
    const [scoreAddition, setScoreAddition] = useState(0);

    const onNumpadAction = useCallback(
        (value: number | NumpadAction) => {
            switch (value) {
                case NumpadAction.CLEAR:
                    setScoreAddition(0);
                    break;
                case NumpadAction.END_TURN:
                    gameSession.updatePlayer(currentPlayer.id, {
                        score: currentPlayer.score + scoreAddition,
                    });
                    setScoreAddition(0);
                    gameSession.endTurn();
                    break;
                default:
                    setScoreAddition((curr) => Number(curr.toString() + value.toString()));
            }
        },
        [currentPlayer.id, currentPlayer.score, gameSession, scoreAddition]
    );

    const onNotOutOfGateClick = useCallback(() => {
        gameSession.updatePlayer(currentPlayer.id, {
            onTheBoard: false,
        });
        gameSession.endTurn();
    }, [currentPlayer.id, gameSession]);

    const onOutOfGateClick = useCallback(() => {
        gameSession.updatePlayer(currentPlayer.id, {
            onTheBoard: true,
        });
        gameSession.endTurn();
    }, [currentPlayer.id, gameSession]);

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
                        }}
                    >
                        {/* TODO: Consider placing the player avatar to the left of the
                            typography as opposed to above it. might help with mobile spacing. */}
                        <Box sx={{ mb: 1 }}>
                            <PlayerAvatar player={currentPlayer} />
                        </Box>
                        <Typography variant="h4" align="center">
                            {`${currentPlayer.name}'s turn!`}
                        </Typography>
                    </div>
                    <div>
                        <Divider sx={{ mb: 1 }}>
                            <Typography variant="button">
                                <i>ON DECK</i>
                            </Typography>
                        </Divider>
                    </div>
                    <Stack
                        direction="row"
                        spacing={gameSession.players.length * (-1 / 2.5)}
                        justifyContent="center"
                        sx={{
                            mb: 1,
                        }}
                    >
                        {playerQueue.map((p) => {
                            return <PlayerAvatar key={`player-${p.id}`} player={p} />;
                        })}
                    </Stack>
                </Stack>
                {currentPlayer.onTheBoard ? (
                    <>
                        <Card
                            sx={{
                                mb: 1,
                                px: 2,
                                borderRadius: 4,
                                border: `0.25rem solid ${currentPlayer.color}`,
                            }}
                        >
                            <Typography variant="h4" align="center">
                                <i>{`+${scoreAddition}`}</i>
                            </Typography>
                        </Card>
                        <Numpad
                            onNumpadAction={onNumpadAction}
                            sx={{ border: `0.25rem solid ${currentPlayer.color}` }}
                        />
                    </>
                ) : (
                    <Card variant="elevation" sx={{ borderRadius: 4, maxWidth: 'sm', padding: 2 }}>
                        <Typography align="center" variant="h4">
                            ON THE BOARD?
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button
                                    onClick={onNotOutOfGateClick}
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{ backgroundColor: theme.palette.text.primary }}
                                >
                                    <Typography variant="h3" color={theme.palette.background.paper}>
                                        NO
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onClick={onOutOfGateClick}
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    fullWidth
                                >
                                    <Typography variant="h3">YES</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography align="center" variant="h5" mt={1}>
                            ANSWERING ENDS TURN
                        </Typography>
                    </Card>
                )}
            </Box>
        </>
    );
};
