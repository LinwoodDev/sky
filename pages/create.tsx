import { Box, Button, Container, Group, TextInput, Title } from '@mantine/core'
import { Timer as TimerIcon, CircleWavyCheck as CircleWavyCheckIcon } from 'phosphor-react'
import React from 'react'
import { useLiveQuery } from "dexie-react-hooks";
import ListButton from '../src/ListButton'
import { db } from '../lib/db';
import { useRouter } from 'next/router';
import { ActivityTypes } from '../lib/activity';


const types = {
}
export default function CreatePage() {
    const [type, setType] = React.useState('countdown')
    const [name, setName] = React.useState('');
    const router = useRouter()

    const create = async () => {
        await db.activities.add({
            type,
            name: name,
            createdAt: new Date(),
            updatedAt: new Date(),
            data: {},
            description: "",
        });
        router.push('/')
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: "100%" }}>
            <Box sx={{ flex: 1 }}>
                <Container size="lg">
                    <Title order={2}>Create</Title>
                    <Container size="xs" sx={{ marginTop: "1em", marginBottom: "2em" }}>
                        <TextInput
                            label="Name"
                            placeholder="The name of your new activity (Optional)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Container>
                    <Container size="sm">
                        <Group direction='column' spacing={1}>
                            {ActivityTypes.map((e) => {
                                const Icon = e.icon;
                                return (
                                    <ListButton
                                        color={e.color}
                                        icon={<Icon />}
                                        label={e.name}
                                        selected={type === e.type}
                                        onClick={() => setType(e.type)}
                                        menu key={e.type} />
                                );
                            })}
                        </Group>
                    </Container>
                </Container>
            </Box>

            <Group position={'right'}>
                <Button variant='outline'>Try</Button>
                <Button onClick={create}>Create</Button>
            </Group>
        </Box>
    )
}