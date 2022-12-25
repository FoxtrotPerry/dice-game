import { useCallback, useMemo, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import { useGameSessionContext } from '@context';
import { Numpad, NumpadAction, PlayerAvatar } from '@components';

export const MainGameLoop = () => {
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
                            <Chip label="On Deck" variant="outlined" />
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
                {currentPlayer.onTheBoard ? (
                    <Numpad
                        onNumpadAction={onNumpadAction}
                        sx={{ border: `0.25rem solid ${currentPlayer.color}` }}
                    />
                ) : (
                    <Card variant="elevation" sx={{ borderRadius: 4, maxWidth: 'sm', padding: 2 }}>
                        <Typography align="center" variant="h3">
                            On the board?
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button
                                    onClick={() => {
                                        gameSession.updatePlayer(currentPlayer.id, {
                                            onTheBoard: false,
                                        });
                                        gameSession.endTurn();
                                    }}
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    NO
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onClick={() => {
                                        gameSession.updatePlayer(currentPlayer.id, {
                                            onTheBoard: true,
                                        });
                                        gameSession.endTurn();
                                    }}
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                >
                                    YES
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                )}
            </Box>
        </>
    );
};
