import { useState } from 'react';
import { useRoutes } from 'react-router-dom';

import { ShowScoreBoardButton } from '@components/ShowScoresButton';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppBoundaryContainer, CenterStageContainer, ToggleThemeButton } from './components';
import { usePreferenceContext } from './context';
import { useRouteToAbout, useRouteToHome, useRouteToRules } from './hooks';
import { About, GameWizard, Home, Rules } from './pages';

import { ShowRecentTurnsButton } from '@components/ShowRecentTurnsButton';
import CasinoIcon from '@mui/icons-material/Casino';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export enum ValidRoutes {
    HOME = '/',
    GAME_WIZARD = '/new-game',
    RULES = 'rules',
    ABOUT = 'about',
}

function App() {
    const { theme } = usePreferenceContext();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const content = useRoutes([
        {
            path: ValidRoutes.HOME,
            element: <Home />,
        },
        {
            path: ValidRoutes.GAME_WIZARD,
            element: <GameWizard />,
        },
        {
            path: ValidRoutes.RULES,
            element: <Rules />,
        },
        {
            path: ValidRoutes.ABOUT,
            element: <About />,
        },
    ]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBoundaryContainer>
                {/* Home Bar */}
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Stack
                            direction="row"
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    onClick={() => setDrawerOpen(true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </div>
                            <div>
                                <ShowRecentTurnsButton />
                                <ShowScoreBoardButton />
                            </div>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <CenterStageContainer>{content}</CenterStageContainer>
            </AppBoundaryContainer>
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
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={useRouteToAbout()}>
                                    <ListItemIcon>
                                        <InfoIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="About" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ToggleThemeButton />
                    </ListItem>
                </Stack>
            </Drawer>
        </ThemeProvider>
    );
}

export default App;
