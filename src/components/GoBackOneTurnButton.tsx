import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { useGameSessionContext } from '@context/GameSessionContext';

import UndoRoundedIcon from '@mui/icons-material/UndoRounded';

export const GoBackOneTurnButton = () => {
    const [showGoBackTurnDialog, setShowGoBackTurnDialog] = useState(false);

    const { goBackOneTurn } = useGameSessionContext();

    return (
        <>
            <IconButton
                onClick={() => {
                    setShowGoBackTurnDialog(true);
                }}
                sx={{ border: '3px solid #3337' }}
            >
                <UndoRoundedIcon />
            </IconButton>
            <Dialog
                open={showGoBackTurnDialog}
                onClose={() => {
                    setShowGoBackTurnDialog(false);
                }}
            >
                <DialogTitle>Go back a turn?</DialogTitle>
                <DialogContent>
                    <Typography align="center">Entries for this turn will be lost.</Typography>
                </DialogContent>
                <DialogActions>
                    <Grid container sx={{ width: '100%' }} columns={13} justifyContent="space-between">
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setShowGoBackTurnDialog(false);
                                }}
                                fullWidth
                            >
                                NO
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    goBackOneTurn();
                                    setShowGoBackTurnDialog(false);
                                }}
                                fullWidth
                            >
                                YES
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );
};
