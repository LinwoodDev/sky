
import { MantineColor } from '@mantine/core';
import { Timer as TimerIcon, CircleWavyCheck as CircleWavyCheckIcon } from 'phosphor-react';
import React from 'react';

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