import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from '../src/Link';
import ProTip from '../src/ProTip';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownPage() {
    const router = useRouter();
    const queryTime = router.query.time as string;
    const parsedIntTime = parseInt(queryTime);
    const time = isNaN(parsedIntTime) ? queryTime : parsedIntTime;

    const calculateDifference = () : TimeLeft => {
        const date = new Date(time);
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60)
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
            <Typography variant="h4" component="h1" gutterBottom>
                Countdown to {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
            </Typography>
            <Box maxWidth="sm">
                <Button variant="contained" component={Link} noLinkStyle href="/">
                    Go to the home page
                </Button>
            </Box>
            <ProTip />
            </Box>
        </Container>
        ;
}
