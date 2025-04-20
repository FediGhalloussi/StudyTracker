import { DateTime } from 'luxon';
import {Task} from "./generated/graphql.ts";

export function getTaskStatus(task : Task) {
    const now = DateTime.now().setZone('Europe/Paris');
    const start = DateTime.fromISO(task.scheduledAt, { zone: 'Europe/Paris' });

    if (!start.isValid) {
        console.error('Invalid scheduledAt date:', task.scheduledAt);
        return 'invalid';
    }

    const end = start.plus({ minutes: task.duration });

    if (now > end) return 'done';
    if (now >= start && now <= end) return 'inProgress';
    return 'upcoming';
}

export function toLocalISOString(date : Date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}