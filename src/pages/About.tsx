import { Button, Divider, Stack, Typography } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';

export const About = () => {
    return (
        <Stack
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            sx={{
                ['& > *']: {
                    textAlign: 'center',
                    width: '100%',
                },
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    background: `-webkit-linear-gradient(45deg, #09f, #0f9 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    width: 'auto',
                }}
            >
                ABOUT
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5">
                Originally made for my Mom, this simple game runner was created for those who find score
                keeping an annoying chore and distraction from the fun of the game.
            </Typography>
            <p>This app is designed to be used on a phone, but can be used on desktop as well.</p>
            <Button
                variant="contained"
                href="https://github.com/foxtrotperry/dice-game"
                target="_blank"
                startIcon={<GitHubIcon />}
                sx={{
                    width: 'auto',
                    mb: 2,
                    background: `-webkit-linear-gradient(45deg, #09f, #0f9 100%)`,
                }}
            >
                Open Source In New Tab
            </Button>
            <Typography>
                The source code for this game runner is fully open source! Feel free to suggest new
                ideas, create PRs, and fork the project!
            </Typography>
            <Typography color={'grey'} mb={1}>
                <br />
                <i>No one likes being score keeper, make a phone do it instead.</i>
            </Typography>
            <Typography variant="body2">
                <i>© Caleb Perry - 2023</i>
            </Typography>
        </Stack>
    );
};
