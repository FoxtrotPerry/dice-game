import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { AppBar, Button, CssBaseline, Fade, IconButton, Stack, Toolbar } from '@mui/material';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBoundaryContainer, CenterStack, CenterStageContainer } from './components';
import { useRouteToGameWizard, useRouteToHome, useRouteToRules } from './hooks';
import { GameWizard, Home, Rules } from './pages';

import CasinoIcon from '@mui/icons-material/Casino';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { GameSessionContextProvider } from './context';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: alpha('#fff', 0.05),
            light: '#fff',
            dark: alpha('#fff', 0.15),
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        secondary: {
            main: alpha('#000', 0.05),
            light: '#fff',
            dark: alpha('#000', 0.15),
        },
        background: {
            default: alpha('#000', 0.2),
        },
    },
});

export enum ValidRoutes {
    HOME = '/',
    GAME_WIZARD = '/new-game',
    RULES = 'rules',
}

function App() {
    const [theme, setTheme] = useState(darkTheme);
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
                            {/* Home Bar Buttons */}
                            <div>
                                <IconButton size="large" edge="start" onClick={useRouteToHome()}>
                                    <CasinoIcon />
                                </IconButton>
                                <Button size="large" onClick={useRouteToGameWizard()}>
                                    New game
                                </Button>
                                <Button size="large" onClick={useRouteToRules()}>
                                    Rules
                                </Button>
                                <Button size="large" onClick={() => undefined}>
                                    About
                                </Button>
                            </div>
                            {/* Dark Theme Toggle */}
                            <IconButton
                                onClick={() => {
                                    setTheme((currTheme) => {
                                        if (currTheme.palette.mode === 'dark') {
                                            return lightTheme;
                                        } else return darkTheme;
                                    });
                                }}
                            >
                                <CenterStack>
                                    <Fade in={theme.palette.mode === 'light'} timeout={500}>
                                        <LightModeIcon />
                                    </Fade>
                                    <Fade in={theme.palette.mode === 'dark'} timeout={500}>
                                        <DarkModeIcon />
                                    </Fade>
                                </CenterStack>
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <CenterStageContainer>
                    <GameSessionContextProvider>{content}</GameSessionContextProvider>
                </CenterStageContainer>
            </AppBoundaryContainer>
        </ThemeProvider>
    );
}

export default App;
