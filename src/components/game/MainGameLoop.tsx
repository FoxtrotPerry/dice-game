import { useCallback, useMemo, useState } from 'react';
import { Box, Button, Card, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { useGameSessionContext } from '@context';
import { Footer, Numpad, NumpadAction, PlayerAvatar } from '@components';

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
                <Card sx={{ mb: 1, width: '100%', borderRadius: 4 }}>
                    <Typography variant="h4" align="center">
                        <i>{`+${scoreAddition}`}</i>
                    </Typography>
                </Card>
                <Numpad onNumpadAction={onNumpadAction} />
            </Box>
        </>
    );
};
