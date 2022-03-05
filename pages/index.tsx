import * as React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Center, Container, Group, List, Text } from '@mantine/core';
import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import ListButton from '../src/ListButton';
import { Star as StarIcon } from 'phosphor-react';
import { ActivityTypes, getActivityType } from '../lib/activity';

const Home: NextPage = () => {
  const router = useRouter();
  const activities = useLiveQuery(async () => db.activities.orderBy('updatedAt').reverse().toArray());
  console.log(activities);
  return (
    <Container size="md">
      {!activities &&
        <Center sx={{ textAlign: 'center' }}>
          There is currently no recent activity.<br />
          Create a new to get started.
        </Center>
      }
      {activities &&
        <Group direction='column'>
          {activities?.map((activity) => {
            const type = getActivityType(activity.type);
            const Icon = type?.icon ?? StarIcon;
            return (
              <ListButton color={type?.color} label={activity.name} key={activity.name} icon={<Icon />} menu />
            );
          })}
        </Group>
      }
    </Container>
  );
};

export default Home;
