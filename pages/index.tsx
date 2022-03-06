import * as React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Center, Container, Group, List, Loader, MultiSelect, Select, Text, TextInput, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import ListButton from '../src/ListButton';
import { Star as StarIcon } from 'phosphor-react';
import { ActivityTypes, getActivityType } from '../lib/activity';
import SkyShell from '../src/Shell';

const Home: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState('');
  const [types, setTypes] = React.useState<string[]>([]);
  const activities = useLiveQuery(async () => db.activities
    .where('name').startsWithAnyOfIgnoreCase(search)
    .and(e => types.length === 0 || types.includes(e.type))
    .sortBy('updatedAt').then(x => x.reverse()), [search, types]);
  console.log(activities);
  return (
    <SkyShell>
      <Container size="md">
        {activities &&
          <Group sx={{ padding: "1em" }}>
            <TextInput
              label="Search"
              placeholder="Search for an activity"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 3 }}
            />
            <MultiSelect
              value={types}
              onChange={(e) => setTypes(e)}
              data={ActivityTypes.map(e => ({ label: e.name, value: e.type }))}
              label="Filter by type"
              placeholder="Select activity type"
              searchable
              nothingFound="Nothing found"
              sx={{ flex: 1 }}
            />
          </Group>
        }
        {!activities &&
          <Center sx={{ textAlign: 'center' }}>
            <Loader variant="dots" />
          </Center>
        }
        {activities?.length == 0 &&
          <Center sx={{ textAlign: 'center' }}>
            There is currently no recent activity.<br />
            Create a new to get started.
          </Center>
        }
        {activities &&
          <Group direction='column' align="stretch">
            {activities?.map((activity) => {
              const type = getActivityType(activity.type);
              const Icon = type?.icon ?? StarIcon;
              return (
                <ListButton href={`/activity?name=${encodeURIComponent(activity.name)}`} key={activity.name} color={type?.color} label={activity.name} description={
                  <>
                    <Text size="sm">{activity.description}</Text>
                    <Group>
                      <Text size="xs" color="gray">Updated: {activity.updatedAt.toLocaleString()}</Text>
                      <Text size="xs" color="gray">Created: {activity.createdAt.toLocaleString()}</Text>
                    </Group>
                  </>
                } icon={<Icon />} />
              );
            })}
          </Group>
        }
      </Container>
    </SkyShell>
  );
};

export default Home;
