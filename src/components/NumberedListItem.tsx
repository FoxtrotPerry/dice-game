import { ReactNode } from 'react';
import { Avatar, ListItem, ListItemText, Typography, useTheme } from '@mui/material';

type NumberedListItemProps = {
    num: number;
    children: ReactNode;
};

export const NumberedListItem = ({ num, children }: NumberedListItemProps) => {
    const theme = useTheme();
    return (
        <ListItem>
            <Avatar sx={{ bgcolor: theme.palette.secondary.dark, mr: 2 }}>
                <Typography color="primary" variant="h6">
                    {num}
                </Typography>
            </Avatar>
            {typeof children === 'string' ? (
                <ListItemText primary={<Typography>{children}</Typography>} />
            ) : (
                children
            )}
        </ListItem>
    );
};
