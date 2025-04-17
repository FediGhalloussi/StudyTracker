import { DateTime } from 'luxon';

export function getTaskStatus(task) {
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
