import { Box, Button, Container, Group, TextInput, Title } from '@mantine/core'
import { Timer as TimerIcon, CircleWavyCheck as CircleWavyCheckIcon } from 'phosphor-react'
import React from 'react'
import ListButton from '../src/ListButton'


const types = {
    countdown: {
        label: "Countdown",
        color: "green",
        icon: <TimerIcon />,
    },
    badge: {
        label: "Badge",
        color: "blue",
        icon: <CircleWavyCheckIcon />,
    }
}
export default function CreatePage() {
    const [type, setType] = React.useState('countdown')

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: "100%" }}>
            <Box sx={{ flex: 1 }}>
                <Container size="lg">
                    <Title order={2}>Create</Title>
                    <Container size="xs" sx={{ marginTop: "1em", marginBottom: "2em" }}>
                        <TextInput
                            label="Name"
                            placeholder="The name of your new activity (Optional)"
                        />
                    </Container>
                    <Container size="sm">
                        <Group direction='column' spacing={1}>
                            {Object.entries(types).map((e, k) => (
                                <ListButton
                                    color={e[1].color}
                                    icon={e[1].icon}
                                    label={e[1].label}
                                    selected={type === e[0]}
                                    onClick={() => setType(e[0])}
                                    menu key={e[0]} />
                            ))}
                        </Group>
                    </Container>
                </Container>
            </Box>

            <Group position={'right'}>
                <Button variant='outline'>Try</Button>
                <Button>Create</Button>
            </Group>
        </Box>
    )
}