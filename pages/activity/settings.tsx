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
                    <Text>Settings are currently not available</Text>
                </Center>
            </Box>
        </ActivityShell>
    )
}