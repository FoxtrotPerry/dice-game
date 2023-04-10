import { alpha, ListItemText, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useGameSessionContext } from '@context';
import { MedalColors } from '@types';

export const LeaderBoard = () => {
    const { players } = useGameSessionContext();
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
                            <TableCell align="right" sx={{ paddingY: 0.5 }}>
                                <Typography
                                    variant="h4"
                                    color={p.color}
                                    sx={{
                                        filter: `drop-shadow(0 0 0.1rem #000F)`,
                                        textShadow:
                                            '-1px -1px 0 #0003, 1px -1px 0 #0003, -1px 1px 0 #0003, 1px 1px 0 #0003',
                                    }}
                                >
                                    {p.name}
                                </Typography>
                            </TableCell>
                            <TableCell align="left" padding="checkbox">
                                <ListItemText primary={p.score} />
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};
