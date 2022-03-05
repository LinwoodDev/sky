import { PropsWithChildren, useState } from 'react';
import { Sun as SunIcon, Moon as MoonIcon, House as HouseIcon, Info as InfoIcon, Plus as PlusIcon } from 'phosphor-react';
import { ActionIcon, AppShell, Burger, Button, Group, Header, MediaQuery, Navbar, Text, Title, UnstyledButton, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import ListButton from './ListButton';
import { useRouter } from 'next/router';

export default function SkyShell({ children }: PropsWithChildren<{}>) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

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
            <ListButton selected={router.pathname == '/create'} color="green" icon={<PlusIcon />} label="Create" href="/create" />
            <ListButton selected={router.pathname == '/'} color="blue" icon={<HouseIcon />} label="Home" href="/" />
            <ListButton selected={router.pathname == '/about'} color="violet" icon={<InfoIcon />} label="About" href="/about" />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} padding="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
