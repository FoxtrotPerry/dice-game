import { useState } from 'react';
import { useRouteToAbout, useRouteToHome, useRouteToRules } from '@hooks/routerHooks';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { ToggleThemeButton } from './ToggleThemeButton';

import CasinoIcon from '@mui/icons-material/Casino';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import MenuIcon from '@mui/icons-material/Menu';
import { useGameSessionContext, usePreferenceContext } from '@context';
import { GameStage } from '@types';

export const AppDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { loadGameData, saveGameData, gameDataExists, gameState } = useGameSessionContext();
    const { theme } = usePreferenceContext();

    const gameInProgress = [GameStage.SETUP, GameStage.GAME_OVER].includes(gameState.stage);

    return (
        <>
            <IconButton size="large" edge="start" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        background: `linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(${
                            theme.palette.mode !== 'dark' ? '255,255,255' : '0,0,0'
                        },0.8) 100%)`,
                        backdropFilter: 'blur(4px)',
                    },
                    elevation: 2,
                }}
            >
                <Stack display="flex" justifyContent="space-between" height="100%">
                    <Box
                        onClick={() => setDrawerOpen(false)}
                        onKeyDown={() => setDrawerOpen(false)}
                        height="100%"
                    >
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={useRouteToHome()}>
                                    <ListItemIcon>
                                        <CasinoIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={useRouteToRules()}>
                                    <ListItemIcon>
                                        <MenuBookIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Rules" />
                                </ListItemButton>
                            </ListItem>
                            <Divider>
                                <Typography>Actions</Typography>
                            </Divider>
                            <ListItem disablePadding>
                                <Tooltip
                                    title={
                                        gameInProgress ? 'Game must be in progress to save' : undefined
                                    }
                                    placement="right"
                                >
                                    <span>
                                        <ListItemButton
                                            onClick={saveGameData}
                                            disabled={gameInProgress}
                                        >
                                            <ListItemIcon>
                                                <SaveIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Save Game" />
                                        </ListItemButton>
                                    </span>
                                </Tooltip>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={loadGameData} disabled={!gameDataExists}>
                                    <ListItemIcon>
                                        <FileUploadIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Load Game" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    <div>
                        <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                            <ToggleThemeButton />
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton onClick={useRouteToAbout()}>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="About" />
                            </ListItemButton>
                        </ListItem>
                    </div>
                </Stack>
            </Drawer>
        </>
    );
};
