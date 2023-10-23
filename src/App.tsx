import { useRoutes } from 'react-router-dom';

import { ShowScoreBoardButton } from '@components/ShowScoresButton';
import { AppBar, CssBaseline, Stack, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppBoundaryContainer, AppDrawer, CenterStageContainer } from './components';
import { usePreferenceContext } from './context';
import { About, GameWizard, Home, Rules } from './pages';

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
                            <span>
                                <AppDrawer />
                            </span>
                            <div>
                                <ShowRecentTurnsButton />
                                <ShowScoreBoardButton />
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
