import { Box, Button, Container, Group, Text, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications';
import React from 'react'

export default function BadgePage() {
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
                    <img src={constructLink()} style={{maxWidth: "100%"}} />
                    <Button variant="filled" onClick={copyLink}>
                        Copy to clipboard
                    </Button>
                </Group>
                </Container>
            </Box>
        </Container>
    )
}