import {
    Box,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { Footer } from '@components';
import { PlayerInput } from '@components/input';
import { useGameSessionContext } from '@context';
import { GameStage } from '@types';
import { useRouteToHome } from '@hooks';

import CasinoIcon from '@mui/icons-material/Casino';

export const playerNumOptions = [...Array(11).keys()].slice(2);

export const GameWizard = () => {
    const theme = useTheme();
    const routeToHome = useRouteToHome();
    const { changeNumOfPlayers, players, updateGameState } = useGameSessionContext();

    const handleChange = (e: SelectChangeEvent) => {
        changeNumOfPlayers(Number(e.target.value));
    };

    return (
        <>
            <Box
                sx={{
                    height: '100%',
                    width: `${theme.breakpoints.values.sm / 2}px`,
                }}
            >
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Typography variant="h5">How many players?</Typography>
                    <Select
                        value={players.length.toString()}
                        variant="standard"
                        onChange={handleChange}
                        autoFocus
                        defaultOpen
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
                {players.map((player) => {
                    return <PlayerInput key={`player-input-${player.id}`} player={player} />;
                })}
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        onClick={() => {
                            updateGameState({ stage: GameStage.FIRST_ROLL });
                            routeToHome();
                        }}
                        variant="contained"
                        size="large"
                    >
                        <Stack direction="row" spacing={1}>
                            <Typography alignItems="center">{`Let's Roll`}</Typography>
                            <CasinoIcon />
                        </Stack>
                    </Button>
                </Box>
            </Box>
        </>
    );
};
