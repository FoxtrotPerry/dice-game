import { usePreferenceContext } from '@context';
import { Button, Fade, Typography } from '@mui/material';
import { CenterStack } from './CenterStack';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ToggleThemeButton = () => {
    const { toggleTheme, theme } = usePreferenceContext();
    return (
        <Button
            onClick={toggleTheme}
            startIcon={
                <CenterStack>
                    <Fade in={theme.palette.mode === 'light'} timeout={500}>
                        <LightModeIcon htmlColor="white" />
                    </Fade>
                    <Fade in={theme.palette.mode === 'dark'} timeout={500}>
                        <DarkModeIcon htmlColor="white" />
                    </Fade>
                </CenterStack>
            }
            sx={{
                background: `-webkit-linear-gradient(45deg, #6200ff, #00c2ff 100%)`,
            }}
        >
            <Typography variant="button" color="white">
                Theme
            </Typography>
        </Button>
    );
};
