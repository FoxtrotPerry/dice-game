import { ReactNode } from 'react';
import Container from '@mui/material/Container';

type CenterStageContainerProps = {
    children: ReactNode;
};

export const AppBoundaryContainer = ({ children }: CenterStageContainerProps) => {
    return (
        <Container
            component="div"
            maxWidth={false}
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            {children}
        </Container>
    );
};
