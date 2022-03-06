import { Box, Button, Center, Container, Grid, Group, Image, Space, Text, TextInput, Title } from '@mantine/core'
import React from 'react'
import { ActivityProps } from '.';
import { constructBadgeLink } from '../../lib/badge';
import ActivityShell from '../../src/ActivityShell'
import { useRouter } from 'next/router';
import { Activity, constructActivityRenderLink } from '../../lib/activity';
import { db } from '../../lib/db';
import { useNotifications } from '@mantine/notifications';
import { Check as CheckIcon } from 'phosphor-react';

export default function ActivitySharePage() {
    const router = useRouter()
    const [activity, setActivity] = React.useState<Activity | undefined>();
    const { name, data } = router.query;
    React.useEffect(() => {
        const loadActivity = async () => {
            if (name) {
                setActivity(await db.activities.where({ name }).first());
            } else if (data) {
                // Data is in base64
                setActivity(JSON.parse(Buffer.from(data.toString(), 'base64').toString()));
            }
        }

        loadActivity();
    }, [data, name]);
    var view = <></>;
    if (activity) {
        switch (activity.type) {
            case 'badge':
                view = <BadgeSharePage activity={activity} />;
                break;
        }
    }
    return (
        <ActivityShell>
            <Box>
                <Title>Share</Title>
                <Space h="md" />
                {view}
            </Box>
        </ActivityShell>
    )
}

export function BadgeSharePage({ activity }: ActivityProps) {
    const { label, value } = activity.data;
    const router = useRouter()
    const notification = useNotifications();
    const link = constructActivityRenderLink(activity);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.origin + link);
        notification.showNotification({
            message: 'Copied to clipboard',
            color: 'green',
            icon: <CheckIcon />
        });
    }
    return (
        <Container size="md">
            <Center>
                <Image height="auto" width="auto" styles={{ image: { maxWidth: "100%" } }} src={link} alt="Badge" />
            </Center>
            <Space h="md" />
            <TextInput value={window.location.origin + link} readOnly />
            <Space h="md" />
            <Group position="center">
                <Button onClick={copyToClipboard}>
                    Copy to clipboard
                </Button>
            </Group>
        </Container>
    )
}