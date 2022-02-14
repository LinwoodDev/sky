import { Container, Box, Typography, TextField, Stack, Button, IconButton, Snackbar } from '@mui/material'
import React from 'react'

export default function BadgePage() {
    // as TextField
    const [label, setLabel] = React.useState('Hello')
    const [value, setValue] = React.useState('World')

    const constructLink = (): string => {
        const labelEncoded = encodeURIComponent(label)
        const valueEncoded = encodeURIComponent(value)
        return `/api/badge/${labelEncoded}/${valueEncoded}`
    }
    const copyLink = () => {
        const link = window.location.origin + constructLink()
        navigator.clipboard.writeText(link)
        setCopyLinkOpen(true);
    }
    const [copyLinkOpen, setCopyLinkOpen] = React.useState(false);

    const handleCopyLinkClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setCopyLinkOpen(false);
    };

    return (
        <Container maxWidth="lg">
            <Snackbar
                open={copyLinkOpen}
                autoHideDuration={6000}
                onClose={handleCopyLinkClose}
                message="Link copied to clipboard"
            />
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Configure Badge
                </Typography>
                <Stack spacing={1}>
                    <TextField
                        label="Label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <TextField
                        label="Value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Stack>
                <Stack spacing={1} mt={4} maxWidth="md" alignItems="center">
                    <img src={constructLink()} style={{maxWidth: "100%"}} />
                    <Button variant="contained" onClick={copyLink}>
                        Copy to clipboard
                    </Button>
                </Stack>
            </Box>
        </Container>
    )
}