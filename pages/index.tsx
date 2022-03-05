import * as React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Center, Container, List, Text } from '@mantine/core';
import Link from 'next/link';

const Home: NextPage = () => {
  const router = useRouter();
  return (
  <Container size="md">
    <Center sx={{textAlign: 'center'}}>
      There is currently no recent activity.<br />
      Create a new to get started.
    </Center>
  </Container>
  );
};

export default Home;
