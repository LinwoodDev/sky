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
    const [link, setLink] = React.useState<string | undefined>();
    const notification = useNotifications();
    const copyToClipboard = () => {
        navigator.clipboard.writeText(link!);
        notification.showNotification({
            message: 'Copied to clipboard',
            color: 'green',
            icon: <CheckIcon />
        });
    }
    React.useEffect(() => {
        const loadActivity = async () => {
            var loaded: Activity | undefined;
            if (name) {
                loaded = await db.activities.where({ name }).first();
            } else if (data) {
                // Data is in base64
                loaded = JSON.parse(Buffer.from(data.toString(), 'base64').toString());
            }
            if(loaded) {
                setActivity(loaded);
                setLink(window.location.origin + constructActivityRenderLink(loaded));
            }
        }

        loadActivity();
    }, [data, name]);
    return (
        <ActivityShell>
            <Box>
                <Title>Share</Title>
                <Space h="md" />
                {activity &&
                    <Container size="md">
                        <Center>
                            <Image height="auto" width="auto" styles={{ image: { maxWidth: "100%" } }} src={link!} alt="Badge" />
                        </Center>
                        <Space h="md" />
                        <TextInput value={link} readOnly />
                        <Space h="md" />
                        <Group position="center">
                            <Button onClick={copyToClipboard}>
                                Copy to clipboard
                            </Button>
                        </Group>
                    </Container>
                }
            </Box>
        </ActivityShell>
    )
}
