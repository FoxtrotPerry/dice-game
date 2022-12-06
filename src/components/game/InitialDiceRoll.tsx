import { Footer } from '@components';
import { GameStage, Player, useGameSessionContext } from '@context';
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
import { useState } from 'react';

const steps = [
    'Every player rolls one dice.',
    'The player with the highest roll gets to live.',
    'If there is a tie, roll again.',
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
                    Roll for first turn!
                </Typography>
                <div style={{ width: '100%' }}>
                    <Divider component="div" sx={{ marginTop: 2 }}>
                        <Chip label="Instructions" variant="outlined" />
                    </Divider>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <List>
                        {steps.map((step, i) => (
                            <ListItem key={`initial-roll-instruction-${i}`}>
                                <Avatar sx={{ bgcolor: theme.palette.secondary.dark, mr: 2 }}>
                                    <Typography color="primary">{i + 1}</Typography>
                                </Avatar>
                                <ListItemText primary={<Typography variant="h6">{step}</Typography>} />
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
                <Button variant="contained" disabled={winner === undefined} onClick={onSubmit}>
                    {`Let's Play!`}
                </Button>
            </Footer>
        </>
    );
};
