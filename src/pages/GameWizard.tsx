import {
    Button,
    debounce,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { Footer } from 'src/components';
import { useGameSessionContext } from 'src/context';

import AccountCircle from '@mui/icons-material/AccountCircle';
import CasinoIcon from '@mui/icons-material/Casino';
import { useRouteToHome } from 'src/hooks';

const playerNumOptions = [...Array(11).keys()].slice(2);

export const GameWizard = () => {
    const theme = useTheme();
    const routeToHome = useRouteToHome();
    const gameSession = useGameSessionContext();

    const handleChange = (e: SelectChangeEvent) => {
        gameSession.changeNumOfPlayers(Number(e.target.value));
    };

    return (
        <>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Typography variant="h5">How many players?</Typography>
                <Select
                    value={gameSession.players.length.toString()}
                    variant="standard"
                    onChange={handleChange}
                >
                    {playerNumOptions.map((option) => {
                        return (
                            <MenuItem value={option} key={`player-num-option-${option}`}>
                                <Typography variant="h5" style={{ marginLeft: theme.spacing(1) }}>
                                    {option}
                                </Typography>
                            </MenuItem>
                        );
                    })}
                </Select>
            </Stack>
            {gameSession.players.map((player) => {
                return (
                    <TextField
                        id={`player-name-text-field-${player.id}`}
                        key={`player-name-text-field-${player.id}`}
                        onChange={debounce((e) => {
                            gameSession.editPlayer(player.id, { name: e.target.value });
                        }, 500)}
                        onKeyDown={(e) => {
                            if (
                                e.key === 'Enter' &&
                                gameSession.players.length < (playerNumOptions?.at(-1) ?? 1)
                            ) {
                                gameSession.changeNumOfPlayers(gameSession.players.length + 1);
                            }
                        }}
                        label={
                            <Stack direction="row" spacing={1}>
                                <AccountCircle sx={{ color: 'action.active' }} />
                                <Typography>{`Player ${player.id + 1}`}</Typography>
                            </Stack>
                        }
                        variant="standard"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                );
            })}
            <Footer>
                <Button
                    onClick={() => {
                        console.clear();
                        console.log(gameSession.players);
                        routeToHome();
                    }}
                    variant="contained"
                    size="large"
                >
                    <Stack direction="row" spacing={1}>
                        <Typography>Start Game</Typography>
                        <CasinoIcon />
                    </Stack>
                </Button>
            </Footer>
        </>
    );
};
