import { useRef, useState } from 'react';
import { Box, debounce, Grid, IconButton, Popover, TextField, Typography } from '@mui/material';
import { Player, playerColorOptions, useGameSessionContext } from '@context';
import { playerNumOptions } from '@pages';

import { AccountCircle } from '@mui/icons-material';

type PlayerInputProps = {
    player: Player;
};

export const PlayerInput = ({ player }: PlayerInputProps) => {
    const gameSession = useGameSessionContext();
    const avatarRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    const close = () => {
        setOpen(false);
    };

    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Box key={`player-input-${player.id}`} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <IconButton
                    onClick={() => {
                        setOpen(!open);
                    }}
                    ref={avatarRef}
                >
                    <AccountCircle
                        sx={{
                            color: player.color,
                            filter: 'drop-shadow(0 0 0.125rem #0007)',
                            stroke: '#0004',
                            strokeWidth: 1,
                        }}
                    />
                </IconButton>
                <TextField
                    id={`player-name-text-field-${player.id}`}
                    key={`player-name-text-field-${player.id}`}
                    onChange={debounce((e) => {
                        gameSession.updatePlayer(player.id, { name: e.target.value });
                    }, 500)}
                    onKeyDown={(e) => {
                        if (
                            e.key === 'Enter' &&
                            gameSession.players.length < (playerNumOptions?.at(-1) ?? 1)
                        ) {
                            gameSession.changeNumOfPlayers(gameSession.players.length + 1);
                        }
                    }}
                    label={<Typography>{`Player ${player.id + 1}`}</Typography>}
                    variant="standard"
                    sx={{ mb: 1 }}
                    fullWidth
                />
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={avatarRef.current}
                onClose={close}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Grid
                    container
                    columns={3}
                    sx={{ p: 1, maxWidth: '11rem' }}
                    display="flex"
                    justifyContent="center"
                >
                    {playerColorOptions.map((option, i) => {
                        return (
                            <Grid item key={`color-option-${i}`}>
                                <IconButton
                                    onClick={() => {
                                        gameSession.updatePlayer(player.id, { color: option.color });
                                        close();
                                    }}
                                >
                                    <AccountCircle
                                        sx={{
                                            color: option,
                                            filter: 'drop-shadow(0 0 0.3rem #0007)',
                                            stroke: '#0007',
                                            strokeWidth: 1,
                                        }}
                                        fontSize="large"
                                    />
                                </IconButton>
                            </Grid>
                        );
                    })}
                </Grid>
            </Popover>
        </div>
    );
};
