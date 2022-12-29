import { ReactNode } from 'react';
import { Container, Stack, useTheme } from '@mui/material';

type CenterStageContainerProps = {
    children: ReactNode;
};

export const CenterStageContainer = ({ children }: CenterStageContainerProps) => {
    const theme = useTheme();
    return (
        <Container
            component="div"
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                paddingY: theme.spacing(2),
                paddingX: theme.spacing(2),
                height: '100%',
            }}
        >
            <Stack width="100%" alignItems="center">
                {children}
            </Stack>
        </Container>
    );
};
