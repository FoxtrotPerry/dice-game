import { useRoutes } from 'react-router-dom';
import { AppBar, Button, CssBaseline, IconButton, Stack, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppBoundaryContainer, CenterStageContainer, ToggleThemeButton } from './components';
import { useRouteToGameWizard, useRouteToHome, useRouteToRules } from './hooks';
import { GameSessionContextProvider, usePreferenceContext } from './context';
import { GameWizard, Home, Rules } from './pages';

import CasinoIcon from '@mui/icons-material/Casino';

export enum ValidRoutes {
    HOME = '/',
    GAME_WIZARD = '/new-game',
    RULES = 'rules',
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
                                {/* <Button size="large" onClick={useRouteToGameWizard()}>
                                    New game
                                </Button> */}
                                <Button size="large" onClick={useRouteToRules()}>
                                    Rules
                                </Button>
                                <Button size="large" onClick={() => undefined}>
                                    About
                                </Button>
                            </div>
                            <ToggleThemeButton />
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
