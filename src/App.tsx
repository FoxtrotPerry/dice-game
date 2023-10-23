import { useRoutes } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';

import { ShowScoreBoardButton } from '@components/ShowScoresButton';
import { AppBar, Button, CssBaseline, Stack, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppBoundaryContainer, AppDrawer, CenterStageContainer } from './components';
import { usePreferenceContext } from './context';
import { About, GameWizard, Home, Rules, SignInDialog, SignUpDialog } from './pages';
import { useRouteToSignInDialog } from '@hooks';

import { ShowRecentTurnsButton } from '@components/ShowRecentTurnsButton';
import { useEffect } from 'react';

export enum ValidRoutes {
    HOME = '/',
    GAME_WIZARD = 'new-game',
    RULES = 'rules',
    ABOUT = 'about',
    SIGN_IN = 'sign-in',
    SIGN_UP = 'sign-up',
}

function App() {
    const { theme } = usePreferenceContext();
    const user = useUser();
    const clerk = useClerk();
    const routeToSignIn = useRouteToSignInDialog();

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
        {
            path: ValidRoutes.SIGN_IN,
            element: <SignInDialog />,
        },
        {
            path: ValidRoutes.SIGN_UP,
            element: <SignUpDialog />,
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
                                {/**
                                 * TODO:
                                 * Break out separate sign in and sign out buttons into separate components
                                 */}
                                <ShowRecentTurnsButton />
                                <ShowScoreBoardButton />
                                {!user.isSignedIn ? (
                                    <Button onClick={() => routeToSignIn()}>Sign In</Button>
                                ) : (
                                    <Button
                                        onClick={async () => {
                                            await clerk.signOut();
                                            // window.location.reload();
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                )}
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
