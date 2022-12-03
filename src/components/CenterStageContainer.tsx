import { Container, Stack, useTheme } from '@mui/material';
import { ReactNode } from 'react';

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
                padding: theme.spacing(2),
                height: '100%',
            }}
        >
            {/* TODO: replace with something other than stack, ideally nothing */}
            <Stack>{children}</Stack>
        </Container>
    );
};
