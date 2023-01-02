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

export const Victory = () => {
    const { players, resetGameStateAndScores } = useGameSessionContext();
    const routeToWizard = useRouteToGameWizard();

    const getTrophyColor = (place: number) => {
        switch (place) {
            case 1:
                return MedalColors.GOLD;
            case 2:
                return MedalColors.SILVER;
            case 3:
                return MedalColors.BRONZE;
            default:
                return MedalColors.DNP;
        }
    };

    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center">
            <Table>
                <TableBody>
                    {players
                        .slice()
                        .sort((a, b) => b.score - a.score)
                        .map((p, i) => (
                            <TableRow
                                key={i}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell align="center" padding="none">
                                    {p.place && p.place <= 3 ? (
                                        <EmojiEventsIcon
                                            sx={{
                                                color: getTrophyColor(p.place),
                                                filter: `drop-shadow(0 0 0.5rem ${alpha(
                                                    getTrophyColor(p.place),
                                                    0.32
                                                )})`,
                                                stroke: '#0007',
                                                strokeWidth: '1px',
                                                height: '2rem',
                                                width: '2rem',
                                            }}
                                        />
                                    ) : (
                                        <Typography variant="h4">{p.place}</Typography>
                                    )}
                                </TableCell>
                                <TableCell align="left" padding="checkbox">
                                    <ListItemText secondary={p.score} />
                                </TableCell>
                                <TableCell align="right" sx={{ paddingY: 0.5 }}>
                                    <Typography variant="h4">{p.name}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
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
