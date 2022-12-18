import { Button, Card, Grid, Typography } from '@mui/material';

export enum NumpadAction {
    CLEAR = 'CLEAR',
    END_TURN = 'END_TURN',
}

type NumpadProps = {
    onNumpadAction: (value: number | NumpadAction) => void;
};

export const Numpad = ({ onNumpadAction }: NumpadProps) => {
    return (
        <Card variant="elevation" sx={{ borderRadius: 4 }}>
            <Grid
                container
                columns={3}
                justifyContent="center"
                sx={{
                    '& > *': {
                        display: 'flex',
                        justifyContent: 'center',
                    },
                }}
            >
                {[...Array(10).keys()].slice(1).map((n, i) => (
                    <Grid item xs={1} key={`keypad-${i}`}>
                        <Button
                            onClick={() => {
                                onNumpadAction(Number(n));
                            }}
                            sx={{ borderRadius: 0 }}
                            fullWidth
                        >
                            <Typography variant="h3">{n}</Typography>
                        </Button>
                    </Grid>
                ))}
                <Grid item xs={1}>
                    <Button
                        onClick={() => {
                            onNumpadAction(NumpadAction.CLEAR);
                        }}
                        sx={{ borderRadius: 4 }}
                        fullWidth
                    >
                        <Typography variant="h5">CLEAR</Typography>
                    </Button>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        onClick={() => {
                            onNumpadAction(0);
                        }}
                        sx={{ borderRadius: 0 }}
                        fullWidth
                    >
                        <Typography variant="h3">0</Typography>
                    </Button>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        onClick={() => {
                            onNumpadAction(NumpadAction.END_TURN);
                        }}
                        sx={{ borderRadius: 4 }}
                        fullWidth
                    >
                        <Typography variant="h5" lineHeight={1}>
                            END TURN
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
};
