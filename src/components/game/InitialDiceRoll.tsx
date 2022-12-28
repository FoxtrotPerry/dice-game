import { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { Footer } from '@components';
import { useGameSessionContext } from '@context';
import { GameStage, Player } from '@types';

const steps = [
    'EVERY PLAYER ROLLS ONE DIE.',
    'THE PLAYER WITH THE HIGHEST ROLL GOES FIRST.',
    'IF THERE IS A TIE, THOSE IN THE TIE ROLL AGAIN.',
];

export const InitialDiceRoll = () => {
    const theme = useTheme();
    const gameSession = useGameSessionContext();
    const [winner, setWinner] = useState<Player>(gameSession.players[0]);

    const onSubmit = () => {
        gameSession.updateGameState({ playersTurn: winner.id, stage: GameStage.MAIN_GAME });
    };

    return (
        <>
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h4" align="center">
                    ROLL FOR FIRST TURN
                </Typography>
                <div style={{ width: '100%' }}>
                    <Divider component="div" sx={{ marginTop: 2 }}>
                        <Chip label="Instructions" variant="outlined" />
                    </Divider>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <List>
                        {steps.map((step, i) => (
                            <ListItem key={`initial-roll-instruction-${i}`}>
                                <Avatar sx={{ bgcolor: theme.palette.secondary.dark, mr: 2 }}>
                                    <Typography color="primary">{i + 1}</Typography>
                                </Avatar>
                                <ListItemText primary={<Typography>{step}</Typography>} />
                            </ListItem>
                        ))}
                    </List>
                    <TextField
                        select
                        id="winner-select"
                        label="Who won?"
                        helperText="Pick who won the dice roll"
                        value={winner?.id}
                        type="number"
                        autoFocus
                        onChange={(e) => {
                            setWinner(
                                gameSession.players.find(
                                    (player) => player.id === Number(e.target.value)
                                ) ?? gameSession.players[0]
                            );
                        }}
                    >
                        {gameSession.players.map((player, i) => {
                            return (
                                <MenuItem
                                    value={player.id}
                                    key={`initial-dice-roll-winner-option-${i}`}
                                >
                                    {player.name}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                </div>
            </Box>
            <Footer>
                <Button
                    variant="contained"
                    size="large"
                    disabled={winner === undefined}
                    onClick={onSubmit}
                >
                    <Typography>{`Let's Play!`}</Typography>
                </Button>
            </Footer>
        </>
    );
};
