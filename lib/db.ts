// db.ts
import { MantineColor } from '@mantine/core';
import Dexie, { Table } from 'dexie';
import { Activity } from './activity';



export class MySubClassedDexie extends Dexie {
    activities!: Table<Activity, string>;

    constructor() {
        super('SkyDB');
        this.version(1).stores({
            activities: 'name, description, type, data, updatedAt, createdAt'
        });
    }
}

export const db = new MySubClassedDexie();