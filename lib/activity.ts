
import { MantineColor } from '@mantine/core';
import { NextRouter } from 'next/router';
import { Timer as TimerIcon, CircleWavyCheck as CircleWavyCheckIcon } from 'phosphor-react';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { db } from './db';

export interface Activity {
    name: string;
    description: string;
    type: string;
    data: any;
    updatedAt: Date;
    createdAt: Date;
}

export type ActivityType = {
    name: string;
    color: MantineColor;
    description?: string;
    type: string;
    icon: React.ElementType;
}

export const getActivityType = (name: string) => {
    return ActivityTypes.find(type => type.type === name);
}
export const ActivityTypes: ActivityType[] = [
    {
        name: "Countdown",
        color: "green",
        icon: TimerIcon,
        type: "countdown",
    },
    {
        name: "Badge",
        color: "blue",
        icon: CircleWavyCheckIcon,
        type: "badge",
    }
];

export const loadActivityFromQuery = async (query: ParsedUrlQuery): Promise<Activity | undefined> => {
    if (query.name) {
        return await db.activities.where({ name: query.name }).first();
    } else if (query.data) {
        // Data is in base64
        return JSON.parse(Buffer.from(query.data.toString(), 'base64').toString());
    }
    return undefined;
}

export const saveActivity = async (activity: Activity) => {
    await db.activities.add(activity);
}
export const saveActivityFromRouter = async (router: NextRouter, activity: Activity) => {
    if (router.query.name) {
        await saveActivity(activity);
    } else if (router.query.data) {
        // Parse activity to base64
        await router.push(`${router.asPath}?data=${Buffer.from(JSON.stringify(activity)).toString('base64')}`, undefined, { shallow: true });
    }
}