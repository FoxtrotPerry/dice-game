import { NumberedListItem } from '@components/NumberedListItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
    Box,
    Divider,
    List,
    ListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import { Stack } from '@mui/system';
import { ReactNode, useMemo } from 'react';
import {
    GiDiceSixFacesFive,
    GiDiceSixFacesFour,
    GiDiceSixFacesOne,
    GiDiceSixFacesSix,
    GiDiceSixFacesThree,
    GiDiceSixFacesTwo,
} from 'react-icons/gi';

const BulletPoint = ({ children }: { children: ReactNode }) => {
    return (
        <ListItem>
            <ChevronRightIcon fontSize="large" />
            <Typography>{children}</Typography>
        </ListItem>
    );
};

const ScoreRow = ({ type, example, points }: { type: string; example: ReactNode; points: number }) => {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
                <Typography variant="h6">{type}</Typography>
            </TableCell>
            <TableCell align="left">{example}</TableCell>
            <TableCell align="left">
                <Typography variant="h6">{points}</Typography>
            </TableCell>
        </TableRow>
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
        <Stack display="flex" alignItems="center" justifyContent="center">
            <Typography
                align="center"
                variant="h2"
                sx={{
                    background: `-webkit-linear-gradient(45deg, #fc3, #c00 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    width: 'auto',
                }}
            >
                DA RULES
            </Typography>
            <Typography align="center">🚧 Rules page is still being written! 🚧</Typography>
            <Divider sx={{ my: 1, borderBottomWidth: 4 }} />
            <Box my={1}>
                <Typography variant="h4" align="center">
                    <u>Who Rolls First?</u>
                </Typography>
                <NumberedListItem num={1}>
                    In order to decide whose turn it is first, each player must roll one die.
                </NumberedListItem>
                <NumberedListItem num={2}>
                    The person with the highest role goes first. Players who tie, re-roll.
                </NumberedListItem>
            </Box>
            <Divider sx={{ mb: 1 }} />
            <Box my={1}>
                <Typography variant="h4" align="center">
                    <u>How to Play</u>
                </Typography>
                <Typography variant="h6" align="center">
                    The game is broken up into three main parts:
                </Typography>
                <List>
                    <NumberedListItem num={1}>
                        <Stack>{`Getting "on the board" (eligable to score).`}</Stack>
                    </NumberedListItem>
                    <NumberedListItem
                        num={2}
                    >{`Earning points fast enough to be the first one "out" (reached or surpassed the score goal).`}</NumberedListItem>
                    <NumberedListItem
                        num={3}
                    >{`Hoping no one beats your score on their last turn. Or if you're the one behind, 
                    try to beat the score leader with one last triumphant turn!`}</NumberedListItem>
                </List>
            </Box>
            <Box my={1}>
                <Typography variant="h5" align="center">
                    <u>{`Getting "on the board"`}</u>
                </Typography>
                <BulletPoint>{`Before a player can score, they must first get "on the board".`}</BulletPoint>
                <BulletPoint>
                    To do this, you must surpass a certain point threshold within one turn. The default
                    threshold is <u>500</u> points.
                </BulletPoint>
                <BulletPoint>
                    {`The player doesn't get to keep the points they earned to get on the board. But on 
                    their next turn they'll now be eligible to score!`}
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
                    {`If you end up with all five dice aside and nothing to roll, then you get to roll
                    all five dice again and keep going!`}
                </BulletPoint>
                <BulletPoint>
                    <u>IMPORTANT:</u> Another way to keep your turn going{' '}
                    <b>without rolling anything scoring</b> is to roll mathcing dice! For example, if
                    you have two dice left to roll and you roll a matching pair, then you get to roll
                    all five dice again and keep your turn alive!
                </BulletPoint>
                <BulletPoint>
                    {`You can keep doing this until you either decide to end your turn and keep the 
                    points you've earned that turn, or you fail to roll anything scoring or matching 
                    and lose all the points you've earned on that turn. Just remember the story of 
                    Icarus and don't get too greedy! ;)`}
                </BulletPoint>
                <Typography variant="h5" align="center" mt={2}>
                    <u>{`Getting to the Score Goal`}</u>
                </Typography>
                <BulletPoint>
                    {`The goal of the game is to reach the score goal before everyone else! If after 
                    you've ended your turn you have supassed or met the score goal, you're considered
                    "out" and now get to watch everyone else roll one last time in a desperate attempt
                    to catch up and beat you at the very last minute!`}
                </BulletPoint>
                <Typography variant="h5" align="center" mt={2}>
                    <u>{`Scoring Rolls`}</u>
                </Typography>
            </Box>
            <Divider sx={{ mb: 1 }} />
            <Box my={1}>
                <TableContainer component={Paper} sx={{ width: 'auto' }}>
                    <Table sx={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Roll</TableCell>
                                <TableCell align="left">Points</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <ScoreRow
                                type="Straight"
                                example={
                                    <>
                                        {One}
                                        {Two}
                                        {Three}
                                        {Four}
                                        {Five}
                                    </>
                                }
                                points={1250}
                            />
                            <ScoreRow
                                type="Straight"
                                example={
                                    <>
                                        {Two}
                                        {Three}
                                        {Four}
                                        {Five}
                                        {Six}
                                    </>
                                }
                                points={1250}
                            />
                            <ScoreRow
                                type="Trio of 1s"
                                example={
                                    <>
                                        {One}
                                        {One}
                                        {One}
                                    </>
                                }
                                points={1100}
                            />
                            <ScoreRow
                                type="Trio of 6s"
                                example={
                                    <>
                                        {Six}
                                        {Six}
                                        {Six}
                                    </>
                                }
                                points={600}
                            />
                            <ScoreRow
                                type="Trio of 5s"
                                example={
                                    <>
                                        {Five}
                                        {Five}
                                        {Five}
                                    </>
                                }
                                points={500}
                            />
                            <ScoreRow
                                type="Trio of 4s"
                                example={
                                    <>
                                        {Four}
                                        {Four}
                                        {Four}
                                    </>
                                }
                                points={400}
                            />
                            <ScoreRow
                                type="Trio of 3s"
                                example={
                                    <>
                                        {Three}
                                        {Three}
                                        {Three}
                                    </>
                                }
                                points={300}
                            />
                            <ScoreRow
                                type="Trio of 2s"
                                example={
                                    <>
                                        {Two}
                                        {Two}
                                        {Two}
                                    </>
                                }
                                points={200}
                            />
                            <ScoreRow type="Single One" example={<>{One}</>} points={100} />
                            <ScoreRow type="Single Five" example={<>{Five}</>} points={50} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Stack>
    );
};
