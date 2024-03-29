import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    Divider,
    Grid,
    Snackbar,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { useGameSessionContext } from '@context';
import { Numpad, NumpadAction, PlayerAvatar, PlayerPlaceBadge, UndoLastTurnButton } from '@components';
import { GameStage } from '@types';
import { useGetTurnResultText } from '@hooks';

export const MainGameLoop = () => {
    const theme = useTheme();
    const gameSession = useGameSessionContext();
    const getTurnResultText = useGetTurnResultText();
    const currentPlayer = gameSession.players[gameSession.gameState.playersTurn];
    const [scoreAddition, setScoreAddition] = useState(0);
    const [lastPlayersTurnResult, setLastPlayersTurnResult] = useState<string | undefined>();

    const onNumpadAction = useCallback(
        (value: number | NumpadAction) => {
            switch (value) {
                case NumpadAction.CLEAR:
                    setScoreAddition(0);
                    break;
                case NumpadAction.END_TURN:
                    {
                        const newScore = currentPlayer.score + scoreAddition;
                        setScoreAddition(0);
                        gameSession.endTurn({
                            playerId: currentPlayer.id,
                            playerUpdate: {
                                score: newScore,
                            },
                            turnEntry: {
                                earned: scoreAddition,
                                total: newScore,
                            },
                        });
                    }
                    break;
                default:
                    setScoreAddition((curr) => Number(curr.toString() + value.toString()));
            }
        },
        [currentPlayer.id, currentPlayer.score, gameSession, scoreAddition]
    );

    const onNotOutOfGateClick = useCallback(() => {
        gameSession.endTurn({
            playerId: currentPlayer.id,
            playerUpdate: {
                onTheBoard: false,
            },
            turnEntry: {
                earned: 0,
                total: 0,
                gotOnTheBoardThisTurn: false,
            },
        });
    }, [currentPlayer.id, gameSession]);

    const onOutOfGateClick = useCallback(() => {
        gameSession.endTurn({
            playerId: currentPlayer.id,
            playerUpdate: {
                onTheBoard: true,
            },
            turnEntry: {
                earned: 0,
                total: 0,
                gotOnTheBoardThisTurn: true,
            },
        });
    }, [currentPlayer.id, gameSession]);

    const playerQueue = useMemo(() => {
        return [
            ...gameSession.players.slice(
                gameSession.gameState.playersTurn + (1 % gameSession.players.length)
            ),
            ...gameSession.players.slice(0, gameSession.gameState.playersTurn),
        ];
    }, [gameSession.gameState.playersTurn, gameSession.players]);

    const currentWinner = useMemo(() => {
        if (gameSession.winnerId !== undefined) return gameSession.players[gameSession.winnerId];
    }, [gameSession.players, gameSession.winnerId]);

    // Handles keeping the last turn result text up to date
    useEffect(() => {
        const lastTurnResult = gameSession.turnResults.at(-1);
        if (lastTurnResult) setLastPlayersTurnResult(getTurnResultText(lastTurnResult));
    }, [gameSession.turnResults, getTurnResultText]);

    return (
        <>
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Stack justifyContent="center" width="100%">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Stack direction="row" alignItems="center">
                            <Box sx={{ mb: 1 }}>
                                <PlayerAvatar player={currentPlayer} />
                            </Box>
                            <Stack ml={1} height="100%" justifyContent="center" width="100%">
                                <Typography variant="h3">{currentPlayer.name}</Typography>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Box display="flex" alignItems="center" height="100%">
                                        <PlayerPlaceBadge player={currentPlayer} />
                                        <Typography variant="h4" ml={1}>
                                            <i>{currentPlayer.score}</i>
                                        </Typography>
                                    </Box>
                                    <UndoLastTurnButton />
                                </Stack>
                            </Stack>
                        </Stack>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Divider sx={{ mb: 1 }}>
                            {gameSession.gameState.stage !== GameStage.FINAL_ROLLS ? (
                                <Typography variant="button">
                                    <i>ON DECK</i>
                                </Typography>
                            ) : (
                                <Typography variant="button">
                                    <i>PLAYER TO BEAT</i>
                                </Typography>
                            )}
                        </Divider>
                    </div>
                    {gameSession.gameState.stage === GameStage.FINAL_ROLLS && currentWinner ? (
                        <Stack direction="row" justifyContent="center" mb={2}>
                            {gameSession.winnerId !== undefined && (
                                <>
                                    <PlayerAvatar player={currentWinner} />
                                    <Stack ml={1}>
                                        <Typography variant="h4">{currentWinner.score}</Typography>
                                        <Typography variant="h6">{`(${
                                            currentWinner.score - currentPlayer.score
                                        } away)`}</Typography>
                                    </Stack>
                                </>
                            )}
                        </Stack>
                    ) : (
                        <>
                            <Stack
                                direction="row"
                                spacing={gameSession.players.length * (-1 / 2.5)}
                                justifyContent="center"
                                sx={{
                                    mb: 1,
                                }}
                            >
                                {playerQueue.map((p, i) => {
                                    return (
                                        <PlayerAvatar
                                            key={`player-${p.id}`}
                                            player={p}
                                            style={{ zIndex: playerQueue.length - i }}
                                        />
                                    );
                                })}
                            </Stack>
                        </>
                    )}
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
                            <Typography variant="h3" align="center">
                                +<i>{`${scoreAddition}`}</i>
                            </Typography>
                        </Card>
                        <Numpad
                            onNumpadAction={onNumpadAction}
                            sx={{ border: `0.25rem solid ${currentPlayer.color}` }}
                        />
                    </>
                ) : (
                    <Card
                        variant="elevation"
                        sx={{
                            borderRadius: 4,
                            maxWidth: 'sm',
                            padding: 2,
                            border: `0.25rem solid ${currentPlayer.color}`,
                        }}
                    >
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
                <Typography variant="h6" mt={0.5}>
                    <i>{`Last turn: ${lastPlayersTurnResult}`}</i>
                </Typography>
                {/* TODO: Make a toast that alerts that someone surpassed or met the score goal */}
                <Snackbar>
                    <Alert />
                </Snackbar>
            </Box>
        </>
    );
};
