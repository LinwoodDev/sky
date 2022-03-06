import { Box, Button, Center, Container, Group, Loader, Space, Text, TextInput, Title } from '@mantine/core'
import { useNotifications } from '@mantine/notifications';
import { useLiveQuery } from 'dexie-react-hooks';
import { useRouter } from 'next/router';
import React from 'react'
import { Activity, saveActivityFromRouter } from '../../lib/activity';
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
                    <Title>Configuration</Title>
                    <Space h="md" />
                    {view}
                </>
                }
            </Box>
        </ActivityShell>
    )
}

export type ActivityProps = {
    activity: Activity
}

export function BadgePage({ activity }: ActivityProps) {
    const [label, setLabel] = React.useState(activity.data.label ?? '')
    const [value, setValue] = React.useState(activity.data.value ?? '')
    const notifications = useNotifications();
    const router = useRouter()

    const save = async ({ newLabel, newValue }: { newLabel?: string, newValue?: string }) => {
        if (newLabel) {
            setLabel(newLabel);
        }
        if (newValue) {
            setValue(newValue);
        }
        activity.data = {
            label: newLabel ?? label,
            value: newValue ?? value
        };
        await saveActivityFromRouter(router, activity);
    }

    return (
        <Container size="sm">
            <TextInput
                label="Label"
                value={label}
                onChange={(e) => save({ newLabel: e.target.value })}
            />
            <TextInput
                label="Value"
                value={value}
                onChange={(e) => save({ newValue: e.target.value })}
            />
        </Container>
    )
}
