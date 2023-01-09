import {
    GiDiceSixFacesFive,
    GiDiceSixFacesFour,
    GiDiceSixFacesOne,
    GiDiceSixFacesSix,
    GiDiceSixFacesThree,
    GiDiceSixFacesTwo,
} from 'react-icons/gi';
import { Box, Divider, List, ListItem, Typography, useTheme } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { Stack } from '@mui/system';
import { NumberedListItem } from '@components/NumberedListItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BulletPoint = ({ children }: { children: ReactNode }) => {
    return (
        <ListItem>
            <ChevronRightIcon fontSize="large" />
            <Typography>{children}</Typography>
        </ListItem>
    );
};

export const Rules = () => {
    const theme = useTheme();
    const One = useMemo(() => {
        return <GiDiceSixFacesOne size={theme.spacing(3)} />;
    }, [theme]);
    const Two = useMemo(() => {
        return <GiDiceSixFacesTwo size={theme.spacing(3)} />;
    }, [theme]);
    const Three = useMemo(() => {
        return <GiDiceSixFacesThree size={theme.spacing(3)} />;
    }, [theme]);
    const Four = useMemo(() => {
        return <GiDiceSixFacesFour size={theme.spacing(3)} />;
    }, [theme]);
    const Five = useMemo(() => {
        return <GiDiceSixFacesFive size={theme.spacing(3)} />;
    }, [theme]);
    const Six = useMemo(() => {
        return <GiDiceSixFacesSix size={theme.spacing(3)} />;
    }, [theme]);
    return (
        <Stack>
            <Typography align="center" variant="h2">
                <i>DA RULES</i>
            </Typography>
            <Divider sx={{ mb: 0.5 }} />
            <Divider sx={{ mb: 2 }} />
            <Box my={1}>
                <Typography variant="h4" align="center">
                    <u>Initial Roll</u>
                </Typography>
                <NumberedListItem num={1}>
                    In order to decide whose turn it is first, each player must roll one die.
                </NumberedListItem>
                <NumberedListItem num={2}>
                    The person with the highest role goes first. Players who tie re-roll.
                </NumberedListItem>
            </Box>
            <Divider sx={{ mb: 1 }} />
            <Box my={1}>
                <Typography variant="h4" align="center">
                    <u>How to Play</u>
                </Typography>
                <Typography variant="h6" align="center">
                    Each player&apos;s game is broken up into three main components:
                </Typography>
                <List>
                    <NumberedListItem num={1}>
                        <Stack>{`Getting "on the board".`}</Stack>
                    </NumberedListItem>
                    <NumberedListItem num={2}>
                        Earn points on your way towards the score goal.
                    </NumberedListItem>
                    <NumberedListItem num={3}>
                        Surpass or meet the score goal (and hope no one beats your score on their last
                        roll).
                    </NumberedListItem>
                </List>
                <Typography variant="h5" align="center">
                    <u>{`Getting "on the board"`}</u>
                </Typography>
                <BulletPoint>{`Before a player can score, the must first get "on the board".`}</BulletPoint>
                <BulletPoint>
                    To do this, you must surpass a certain point threshold within one turn. The default
                    threshold is <u>500</u> points.
                </BulletPoint>
                <BulletPoint>
                    {`The player doesn't get to keep the points they earned to get on the board. But on 
                    their next turn they'll now be eligible to score.`}
                </BulletPoint>
                <Typography variant="h5" align="center" mt={2}>
                    <u>Earning Points</u>
                </Typography>
                <BulletPoint>
                    To start your turn, roll all five dice. In order to start earning points and keep
                    your turn going, you need to roll any of the scoring dice combinations listed below
                </BulletPoint>
                <BulletPoint>
                    {`If you don't have anything scoring in your roll, then sadly your turn is over.`}
                </BulletPoint>
                <BulletPoint>
                    If your roll is scoring, then you have two choices. You can <i>either</i> keep your
                    earned points and end your turn, or you can put the scoring dice aside and roll the
                    remaining dice hoping for another scoring roll.
                </BulletPoint>
                <BulletPoint>
                    {`If at any point you don't score anything on a roll, then you do NOT keep 
                    the points you've earned up to that point and your turn is over.`}
                </BulletPoint>
                <BulletPoint>
                    {`If your roll is scoring, or contains pairs of dice (ex: you roll three 
                    remaining dice and get a one and two fours) then you can pick up all five dice, 
                    keep your score, and roll them all again. If however, you instead rolled two ones 
                    and a four, then you can only choose to roll the one remaining die.`}
                </BulletPoint>
                <Typography variant="h5" align="center" mt={2}>
                    <u>{`Passing the Score Goal`}</u>
                </Typography>
                <Typography variant="h5" align="center" mt={2}>
                    <u>{`Scoring Rolls`}</u>
                </Typography>
            </Box>
            <Divider sx={{ mb: 1 }} />
        </Stack>
    );
};
