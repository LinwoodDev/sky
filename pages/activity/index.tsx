import { Box, Button, Center, Container, Group, Loader, Text, TextInput, Title } from '@mantine/core'
import { useNotifications } from '@mantine/notifications';
import { useLiveQuery } from 'dexie-react-hooks';
import { useRouter } from 'next/router';
import React from 'react'
import { Activity } from '../../lib/activity';
import { constructBadgeLink } from '../../lib/badge';
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
                {activity && <>
                    <Title sx={{ marginBottom: "1em" }}>Configuration</Title>
                    {view}
                </>
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

    const [preview, setPreview] = React.useState<string>(`<Loader variant="dots" />`);

    React.useEffect(() => {
        const fetchBadge = async () => {
            setPreview(await fetch(constructBadgeLink(label, value)).then(res => res.text()));
        }
        fetchBadge();
    }, [label, value]);

    const copyLink = () => {
        const link = window.location.origin + constructBadgeLink(label, value)
        navigator.clipboard.writeText(link)
        notifications.showNotification({
            title: 'Link copied',
            message: 'The link has been copied to your clipboard',
            color: 'green'
        })
    }

    return (
        <Container size="sm">
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
            <div dangerouslySetInnerHTML={{ __html: preview }} />
        </Container>
    )
}
