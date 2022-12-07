import { Fade, IconButton } from '@mui/material';
import { CenterStack } from './CenterStack';
import { usePreferenceContext } from '@context';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const ToggleThemeButton = () => {
    const { toggleTheme, theme } = usePreferenceContext();
    return (
        <IconButton onClick={toggleTheme}>
            <CenterStack>
                <Fade in={theme.palette.mode === 'light'} timeout={500}>
                    <LightModeIcon />
                </Fade>
                <Fade in={theme.palette.mode === 'dark'} timeout={500}>
                    <DarkModeIcon />
                </Fade>
            </CenterStack>
        </IconButton>
    );
};
