import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import { useRouter } from 'next/router';
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Linwood Sky
        </Typography>
        <Typography variant="caption" component="p">
          Data is important.
        </Typography>

        <List aria-label="apps"
          subheader={<ListSubheader>Apps</ListSubheader>}>
          <ListItemButton
            onClick={() => router.push("/countdown")}
          >
            <ListItemIcon>
              <AccessAlarmOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Countdown" />
          </ListItemButton>
        </List>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Home;
