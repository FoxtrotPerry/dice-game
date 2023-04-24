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
            return `${player} Got on the board: ${tr.turnEntry.gotOnTheBoardThisTurn}`;
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
            >
                <DialogTitle>Recent Turns</DialogTitle>
                <DialogContent>
                    {session.turnResults.length !== 0 ? (
                        session.turnResults.reverse().map((tr, i) => {
                            return <ListItemText key={i} primary={getTurnResultText(tr)} />;
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
                        variant="outlined"
                        onClick={() => {
                            setShowRecentTurns(false);
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
