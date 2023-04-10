import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { GameStage } from '@types';
import { LeaderBoard } from './game';
import { useGameSessionContext } from '@context/GameSessionContext';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

export const ShowScoreBoardButton = () => {
    const session = useGameSessionContext();
    const [showScores, setShowScores] = useState(false);

    return (
        <>
            <IconButton
                onClick={() => {
                    setShowScores(true);
                }}
                disabled={session.gameState.stage === GameStage.SETUP}
            >
                <FormatListNumberedIcon />
            </IconButton>
            <Dialog
                open={showScores}
                onClose={() => {
                    setShowScores(false);
                }}
            >
                <DialogTitle>LEADER BOARD</DialogTitle>
                <DialogContent>
                    <LeaderBoard />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setShowScores(false);
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
