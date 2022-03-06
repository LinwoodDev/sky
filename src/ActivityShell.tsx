import { PropsWithChildren, useState } from 'react';
import { Share as ShareIcon, Palette as PaletteIcon, Faders as FadersIcon, Sun as SunIcon, Moon as MoonIcon, House as HouseIcon, Info as InfoIcon, Gear as GearIcon } from 'phosphor-react';
import { ActionIcon, AppShell, Box, Burger, Button, Divider, Group, Header, MediaQuery, Navbar, Paper, Text, ThemeIcon, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import ListButton from './ListButton';
import { useRouter } from 'next/router';
import { Activity, getActivityType, loadActivityFromQuery } from '../lib/activity';
import React from 'react';

export default function ActivityShell({ children }: PropsWithChildren<{}>) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const [activity, setActivity] = useState<Activity | undefined>();
  React.useEffect(() => {
    loadActivityFromQuery(router.query).then(setActivity);
  }, [router.query]);
  const type = activity ? getActivityType(activity.type) : undefined;
  const TypeIcon = type?.icon ?? SunIcon;
  var query = "";
  if (router.query.name) query = `?name=${router.query.name}`;
  else if (router.query.data) query = `?data=${router.query.data}`;

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          padding="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 200, lg: 300 }}
        >

          <Navbar.Section grow mt="sm">
            <Group>
              <ThemeIcon color={type?.color} variant="light">
                <TypeIcon />
              </ThemeIcon>
              <Text>{activity?.name}</Text>
            </Group>
            <Divider sx={{ marginTop: "1em", marginBottom: "1em" }} />
            <ListButton selected={router.pathname === '/activity'} color="green" icon={<FadersIcon />} label="Configuration" href={`/activity${query}`} />
            <ListButton selected={router.pathname === '/activity/styling'} color="blue" icon={<PaletteIcon />} label="Styling" href={`/activity/styling${query}`} />
            <ListButton selected={router.pathname === '/activity/share'} color="orange" icon={<ShareIcon />} label="Share" href={`/activity/share${query}`} />
            <ListButton selected={router.pathname === '/activity/settings'} color="violet" icon={<GearIcon />} label="Settings" href={`/activity/settings${query}`} />
          </Navbar.Section>
        </ Navbar>
      }
      header={
        <Header height={70} padding="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <ActionIcon
              onClick={() => router.push("/")}
              title="Home"
              size="lg"
              sx={{ marginRight: '1em' }}
            >
              <HouseIcon size={24} />
            </ActionIcon>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group position="apart" sx={{ flex: 1 }}>
              <Title order={1}>Linwood Sky</Title>
              <ActionIcon
                variant="outline"
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
                size="lg"
              >
                {dark ? (
                  <SunIcon />
                ) : (
                  <MoonIcon />
                )}
              </ActionIcon>
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
