import { Box, Button, Center, Container, Text, TextInput, Title } from '@mantine/core'
import { useModals } from '@mantine/modals';
import { useRouter } from 'next/router';
import React from 'react'
import { Activity } from '../../../lib/activity';
import { db } from '../../../lib/db';
import ActivityShell from '../../../src/ActivityShell'


export default function ActivitySettingsPage() {
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
    const modals = useModals();

    const showDelete = () => {
        modals.openConfirmModal({
            title: 'Delete activity',
            children: <Text size='sm'>
                Are you sure you want to delete this activity?
            </Text>,
            labels: {
                confirm: 'Delete',
                cancel: 'Cancel'
            },
            onConfirm: deleteActivity
        });
    }

    const deleteActivity = () => {
        const current = name?.toString();
        if (current) {
            db.activities.delete(current);
            router.push("/");
        }
    }

    return (
        <ActivityShell>
            <Container size="sm">
                <Title>Settings</Title>
                <Box m={8}>
                    <Title order={2} mb={8}>
                        Manage
                    </Title>
                    <Button onClick={showDelete} color="red">
                        Delete
                    </Button>

                </Box>
            </Container>
        </ActivityShell>
    )
}