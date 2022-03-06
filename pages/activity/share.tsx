import { Box, Center, Text, Title } from '@mantine/core'
import React from 'react'
import ActivityShell from '../../src/ActivityShell'

export default function ActivitySharePage() {
    return (
        <ActivityShell>
            <Box>
                <Title>Share</Title>
                <Center>
                    <Text>Share is only available when saving the activity</Text>
                </Center>
            </Box>
        </ActivityShell>
    )
}