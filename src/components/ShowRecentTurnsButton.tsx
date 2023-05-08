import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import { GameStage, PlayerTurnResult } from '@types';
import { useGameSessionContext } from '@context/GameSessionContext';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

export const ShowRecentTurnsButton = () => {
    const theme = useTheme();
    const session = useGameSessionContext();
    const [showRecentTurns, setShowRecentTurns] = useState(false);

    const getTurnResultText = (tr: PlayerTurnResult) => {
        const player = session.players[tr.playerId].name;
        if (tr.turnEntry.gotOnTheBoardThisTurn !== undefined) {
            return `${player} ${
                tr.turnEntry.gotOnTheBoardThisTurn ? 'Got' : "Didn't get"
            } on the board.`;
        }
        return `${player} Earned: ${tr.turnEntry.earned} Total: ${tr.turnEntry.total}`;
    };

    return (
        <>
            <IconButton
                onClick={() => {
                    setShowRecentTurns(true);
                }}
                disabled={session.gameState.stage === GameStage.SETUP}
            >
                <FormatListNumberedIcon />
            </IconButton>
            <Dialog
                open={showRecentTurns}
                onClose={() => {
                    setShowRecentTurns(false);
                }}
                PaperProps={{
                    sx: {
                        margin: 0,
                    },
                }}
            >
                <DialogTitle>Turn Log</DialogTitle>
                <DialogContent>
                    {session.turnResults.length !== 0 ? (
                        session.turnResults.reverse().map((tr, i) => {
                            return (
                                <ListItemText
                                    key={i}
                                    primary={`Turn ${i + 1}: ` + getTurnResultText(tr)}
                                />
                            );
                        })
                    ) : (
                        <Typography textAlign="center" color={theme.palette.secondary.dark}>
                            No turns yet.
                            <br />
                            <i>Get to rollin!</i>
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setShowRecentTurns(false);
                        }}
                        fullWidth
                    >
                        <Typography variant="h5">Close</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
