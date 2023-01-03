import {
    Box,
    Button,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';
import { useGameSessionContext } from '@context';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { MedalColors } from '@types';
import { alpha } from '@mui/system';
import { useRouteToGameWizard } from '@hooks/routerHooks';
import { LeaderBoard } from './LeaderBoard';

export const Victory = () => {
    const { resetGameStateAndScores } = useGameSessionContext();
    const routeToWizard = useRouteToGameWizard();

    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center">
            <LeaderBoard />
            <Box display="flex" justifyContent="center" width="100%">
                <Button
                    onClick={() => {
                        resetGameStateAndScores();
                        routeToWizard();
                    }}
                    variant="contained"
                    size="large"
                >
                    PLAY AGAIN?
                </Button>
            </Box>
        </Box>
    );
};
