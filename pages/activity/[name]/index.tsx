import { Box, Button, Center, Container, Group, Loader, Space, Text, TextInput, Tabs, Title } from '@mantine/core'
import { useNotifications } from '@mantine/notifications';
import { DatePicker } from '@mantine/dates';
import { useLiveQuery } from 'dexie-react-hooks';
import { useRouter } from 'next/router';
import React from 'react'
import { Activity, saveActivityFromRouter } from '../../../lib/activity';
import { constructBadgeLink } from '../../../lib/badge';
import { db } from '../../../lib/db';
import ActivityShell from '../../../src/ActivityShell';


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
            case 'countdown':
                view = <CountdownPage activity={activity} />;
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


export function CountdownPage({ activity }: ActivityProps) {
    const [value, setValue] = React.useState(activity.data.countdownType ?? 0);
    const [dateTime, setDateTime] = React.useState<Date | null>(activity.data.dateTime ? new Date(activity.data.dateTime) : new Date());
    const [days, setDays] = React.useState(activity.data.days ?? 0);
    const [hours, setHours] = React.useState(activity.data.hours ?? 0);
    const [minutes, setMinutes] = React.useState(activity.data.minutes ?? 0);
    const [seconds, setSeconds] = React.useState(activity.data.seconds ?? 0);

    const save = async ({newCountdownType, newDateTime, newDays, newHours, newMinutes, newSeconds}: {newCountdownType?: number, newDateTime?: Date, newDays?: number, newHours?: number, newMinutes?: number, newSeconds?: number}) => {
        if (newCountdownType) {
            setValue(newCountdownType);
        }
        if (newDateTime) {
            setDateTime(newDateTime);
        }
        if (newDays) {
            setDays(newDays);
        }
        if (newHours) {
            setHours(newHours);
        }
        if (newMinutes) {
            setMinutes(newMinutes);
        }
        if (newSeconds) {
            setSeconds(newSeconds);
        }
        if (value === 0) {
            activity.data = {
                countdownType: newCountdownType ?? value,
                dateTime: (newDateTime ?? dateTime)?.toISOString(),
            }
        } else {
            activity.data = {
                countdownType: newCountdownType ?? value,
                days: newDays ?? days,
                hours: newHours ?? hours,
                minutes: newMinutes ?? minutes,
                seconds: newSeconds ?? seconds,
            }
        }
    }



    const handleChange = (newValue: number) => {
        setValue(newValue);
    };
    return (
        <Container size="sm">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs active={value} onTabChange={handleChange}>
                    <Tabs.Tab label="Date time">
                        <Group direction='column' spacing={3}>
                            <DatePicker
                                label="Date time"
                                value={dateTime}
                                onChange={(newValue) => {
                                    save({newDateTime: new Date(newValue ?? new Date())});
                                }}
                            />
                        </Group>
                    </Tabs.Tab>
                    <Tabs.Tab label="Duration">
                        <Group direction='column' spacing={3}>
                            <TextInput
                                label="Days"
                                type="number"
                                value={days}
                                onChange={(event) => {
                                    const newValue = parseInt(event.target.value);
                                    save({newDays: newValue});
                                }}
                            />
                            <TextInput
                                label="Hours"
                                type="number"
                                value={hours}
                                onChange={(event) => {
                                    const newValue = parseInt(event.target.value);
                                    save({newHours: newValue});
                                }}
                            />
                            <TextInput
                                label="Minutes"
                                type="number"
                                value={minutes}
                                onChange={(event) => {
                                    const newValue = parseInt(event.target.value);
                                    save({newMinutes: newValue});
                                }}
                            />
                            <TextInput
                                label="Seconds"
                                type="number"
                                value={seconds}
                                onChange={(event) => {
                                    const newValue = parseInt(event.target.value);
                                    save({newSeconds: newValue});
                                }}
                            />
                        </Group>
                    </Tabs.Tab>
                </Tabs>
            </Box>
        </Container>
    );
}