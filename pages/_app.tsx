import { AppProps } from 'next/app';
import Head from 'next/head';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import SkyShell from '../src/Shell';
import { useState } from 'react';
import { useHotkeys, useLocalStorageValue } from '@mantine/hooks';


export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);


  return (
    <>
      <Head>
        <title>Linwood Sky</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          theme={{
            /** Put your mantine theme override here */
            colorScheme
          }}
          withNormalizeCSS
        >
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>

        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
