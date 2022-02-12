import { DateTimePicker } from '@mui/lab';
import { Box, Button, Container, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from '../src/Link';
import ProTip from '../src/ProTip';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    inPast: boolean;
}

export default function CountdownPage() {
    const router = useRouter();
    const queryTime = router.query.time as string;
    const parsedIntTime = parseInt(queryTime);
    const time = isNaN(parsedIntTime) ? queryTime : parsedIntTime;
    if (!time) {
        return <CountdownConfigureView />;
    } else {
        return <CountdownView date={new Date(time)} />;
    }
}

export function CountdownView({ date }: { date: Date }) {

    const calculateDifference = (): TimeLeft => {
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        const inPast = diff < 0;
        const seconds = Math.abs(Math.floor(diff / 1000));
        const minutes = Math.abs(Math.floor(seconds / 60));
        const hours = Math.abs(Math.floor(minutes / 60));
        const days = Math.abs(Math.floor(hours / 24));
        return {
            days,
            hours: hours % 24,
            minutes: minutes % 60,
            seconds: seconds % 60,
            inPast
        };
    }
    const [timeLeft, setTimeLeft] = useState(calculateDifference());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateDifference());
        }, 1000);
    });
    return <Container maxWidth="lg">
        <Box
            sx={{
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom color={timeLeft.inPast ? "primary" : ""}>
                {timeLeft.days > 0 && <>
                    {timeLeft.days}:
                </>}
                {timeLeft.hours > 0 && <>
                    {timeLeft.hours}:
                </>}
                {timeLeft.minutes > 0 && <>
                    {timeLeft.minutes}:
                </>}
                {timeLeft.seconds > 0 && <>
                    {timeLeft.seconds}
                </>}
            </Typography>
            <Typography>
                {date.toLocaleString()}
            </Typography>
            <Box maxWidth="sm">
                <Button variant="contained" component={Link} noLinkStyle href="/countdown">
                    Configure
                </Button>
            </Box>
        </Box>
    </Container>
}

export function CountdownConfigureView({ }: {}) {
    const [value, setValue] = React.useState(0);
    const [dateTime, setDateTime] = React.useState<Date | null>(new Date());
    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Configure Countdown
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Date time" />
                        <Tab label="Duration" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Stack spacing={3}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Date time"
                                value={dateTime}
                                onChange={(newValue) => {
                                    setDateTime(new Date(newValue ?? new Date()));
                                }}
                            />
                            <Button variant="contained" component={Link} noLinkStyle href={`/countdown?time=${dateTime?.toUTCString() ?? ''}`}>
                                Go
                            </Button>
                        </Stack>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Stack spacing={3}>
                            <TextField
                                label="Days"
                                type="number"
                                value={days}
                                onChange={(event) => {
                                    setDays(parseInt(event.target.value));
                                }}
                            />
                            <TextField
                                label="Hours"
                                type="number"
                                value={hours}
                                onChange={(event) => {
                                    setHours(parseInt(event.target.value));
                                }}
                            />
                            <TextField
                                label="Minutes"
                                type="number"
                                value={minutes}
                                onChange={(event) => {
                                    setMinutes(parseInt(event.target.value));
                                }}
                            />
                            <TextField
                                label="Seconds"
                                type="number"
                                value={seconds}
                                onChange={(event) => {
                                    setSeconds(parseInt(event.target.value));
                                }}
                            />
                            <Button variant="contained" component={Link} noLinkStyle href={`/countdown?time=${new Date(Date.now() + (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000)).toUTCString()}`}>
                                Go
                            </Button>
                        </Stack>
                    </TabPanel>
                </Box>
            </Box>

        </Container>
    );
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`countdown-tabpanel-${index}`}
            aria-labelledby={`countdown-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
