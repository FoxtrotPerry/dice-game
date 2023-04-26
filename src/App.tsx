import { useRoutes } from 'react-router-dom';
import { AppBar, Button, CssBaseline, IconButton, Stack, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppBoundaryContainer, CenterStageContainer, ToggleThemeButton } from './components';
import { useRouteToAbout, useRouteToHome, useRouteToRules } from './hooks';
import { usePreferenceContext } from './context';
import { About, GameWizard, Home, Rules } from './pages';
import { ShowScoreBoardButton } from '@components/ShowScoresButton';

import CasinoIcon from '@mui/icons-material/Casino';
import { ShowRecentTurnsButton } from '@components/ShowRecentTurnsButton';

export enum ValidRoutes {
    HOME = '/',
    GAME_WIZARD = '/new-game',
    RULES = 'rules',
    ABOUT = 'about',
}

function App() {
    const { theme } = usePreferenceContext();

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
                                <IconButton size="large" edge="start" onClick={useRouteToHome()}>
                                    <CasinoIcon />
                                </IconButton>
                                <Button size="large" onClick={useRouteToRules()}>
                                    Rules
                                </Button>
                                <Button size="large" onClick={useRouteToAbout()}>
                                    About
                                </Button>
                            </div>
                            <div>
                                <ShowRecentTurnsButton />
                                <ShowScoreBoardButton />
                                <ToggleThemeButton />
                            </div>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <CenterStageContainer>{content}</CenterStageContainer>
            </AppBoundaryContainer>
        </ThemeProvider>
    );
}

export default App;
