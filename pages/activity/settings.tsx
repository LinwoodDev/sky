import { Box, Center, Text, TextInput, Title } from '@mantine/core'
import React from 'react'
import ActivityShell from '../../src/ActivityShell'

type Props = {}

export default function ActivitySettingsPage({ }: Props) {
    return (
        <ActivityShell>
            <Box>
                <Title>Settings</Title>
                <Center>
                    <Text>Settings are only available when saving the activity</Text>
                </Center>
            </Box>
        </ActivityShell>
    )
}