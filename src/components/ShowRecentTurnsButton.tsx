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
import { GameStage } from '@types';
import { useGameSessionContext } from '@context/GameSessionContext';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useGetTurnResultText } from '@hooks/useGetTurnResultText';

export const ShowRecentTurnsButton = () => {
    const theme = useTheme();
    const session = useGameSessionContext();
    const [showRecentTurns, setShowRecentTurns] = useState(false);

    const getTurnResultText = useGetTurnResultText();

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
