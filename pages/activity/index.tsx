import { Box, Button, Center, Container, Group, Loader, Text, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications';
import { useLiveQuery } from 'dexie-react-hooks';
import { useRouter } from 'next/router';
import React from 'react'
import { Activity } from '../../lib/activity';
import { db } from '../../lib/db';
import ActivityShell from '../../src/ActivityShell';


export default function ActivityPage() {
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
                view = <BadgePage activity={activity} />;
                break;
        }
    }
    return (
        <ActivityShell>
            <Box>
                {!activity &&
                    <Center>
                        <Loader variant="dots" />
                    </Center>
                }
                {activity &&
                    view
                }
            </Box>
        </ActivityShell>
    )
}

type ActivityProps = {
    activity: Activity
}

export function BadgePage({ activity }: ActivityProps) {
    // as TextField
    const [label, setLabel] = React.useState('Hello')
    const [value, setValue] = React.useState('World')
    const notifications = useNotifications();

    const constructLink = (): string => {
        const labelEncoded = encodeURIComponent(label)
        const valueEncoded = encodeURIComponent(value)
        return `/api/badge/${labelEncoded}/${valueEncoded}`
    }
    const copyLink = () => {
        const link = window.location.origin + constructLink()
        navigator.clipboard.writeText(link)
        notifications.showNotification({
            title: 'Link copied',
            message: 'The link has been copied to your clipboard',
            color: 'green'
        })
    }

    return (
        <Container size="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text component="h1">
                    Configure Badge
                </Text>
                <Group direction="column">
                    <TextInput
                        label="Label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <TextInput
                        label="Value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Group>
                <Container size="md">
                    <Group direction="column">
                        <img src={constructLink()} style={{ maxWidth: "100%" }} />
                        <Button variant="filled" onClick={copyLink}>
                            Copy to clipboard
                        </Button>
                    </Group>
                </Container>
            </Box>
        </Container>
    )
}