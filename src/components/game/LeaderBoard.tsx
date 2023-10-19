import { useCallback, useEffect, useState } from 'react';
import {
    alpha,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { useGameSessionContext } from '@context';
import { GameStage, MedalColors } from '@types';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

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

export const LeaderBoard = () => {
    const { players, gameState, updatePlayer } = useGameSessionContext();
    const [allowNameEdits, setAllowNameEdits] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [editedPlayerId, setEditedPlayerId] = useState<number | undefined>(undefined);

    const theme = useTheme();

    useEffect(() => {
        setAllowNameEdits(
            [GameStage.REGULATION, GameStage.FINAL_ROLLS].includes(gameState.stage) ? true : false
        );
    }, [gameState.stage]);

    const closeEditDialog = useCallback(() => {
        setOpenEditDialog(false);
    }, []);

    return (
        <>
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
                                <TableCell
                                    align="right"
                                    sx={{ paddingY: 0.5, paddingX: 0.5, overflow: 'hidden' }}
                                >
                                    <Stack direction="row">
                                        {allowNameEdits && (
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    setEditedPlayerId(p.id);
                                                    setNewPlayerName(p.name);
                                                    setOpenEditDialog(true);
                                                }}
                                            >
                                                <DriveFileRenameOutlineIcon
                                                    htmlColor={theme.palette.secondary.dark}
                                                />
                                            </IconButton>
                                        )}
                                        <Stack
                                            sx={{
                                                '& > *': {
                                                    lineHeight: 1,
                                                    textAlign: 'left',
                                                },
                                            }}
                                        >
                                            <Typography
                                                variant="h4"
                                                color={p.color}
                                                sx={{
                                                    filter: `drop-shadow(0 0 0.1rem #000F)`,
                                                    textShadow:
                                                        '-1px -1px 0 #0003, 1px -1px 0 #0003, -1px 1px 0 #0003, 1px 1px 0 #0003',
                                                    maxWidth: (theme) => {
                                                        const spacingNum = Number(
                                                            theme.spacing(16).slice(0, -2)
                                                        );
                                                        return window.screen.width - spacingNum;
                                                    },
                                                }}
                                                whiteSpace="nowrap"
                                                overflow="hidden"
                                                textOverflow="ellipsis"
                                            >
                                                {p.name}
                                            </Typography>
                                            <Typography>
                                                <i>{p.score}</i>
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {allowNameEdits && (
                <Dialog open={openEditDialog}>
                    <DialogTitle>Rename Player</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={newPlayerName}
                            onChange={(e) => {
                                setNewPlayerName(e.target.value);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Grid container spacing={1}>
                            <Grid item xs={true}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setNewPlayerName('');
                                        closeEditDialog();
                                    }}
                                    fullWidth
                                >
                                    Close
                                </Button>
                            </Grid>
                            <Grid item xs={true}>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        editedPlayerId !== undefined &&
                                            updatePlayer(editedPlayerId, { name: newPlayerName });
                                        setEditedPlayerId(undefined);
                                        setNewPlayerName('');
                                        closeEditDialog();
                                    }}
                                    fullWidth
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};
