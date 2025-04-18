import { FieldDescriptor } from '../components/ui/EditableEntityList';
import { v4 as uuidv4 } from 'uuid';

export interface TaskDraft {
    id: string;
    title: string;
    scheduledDate: string;
    scheduledTime: string;
    duration: number;
    isNew?: boolean;
    type: string;
    assignmentsId: string;
    examId: string;
}

export const getTaskFields = (): FieldDescriptor<TaskDraft>[] => [
    { key: 'title', label: 'Titre', type: 'text' },
    { key: 'scheduledDate', label: 'Date', type: 'date' },
    { key: 'scheduledTime', label: 'Heure', type: 'text' },
    { key: 'duration', label: 'Durée (min)', type: 'text' },
    { key: 'type', label: 'Type', type: 'text' },
    { key: 'assignmentsId', label: 'Assignments', type: 'text' },
    { key: 'examId', label: 'Exams', type: 'text' },
];

export const defaultTaskDraft = (date: string): TaskDraft => ({
    id: uuidv4(),
    title: '',
    scheduledDate: date,
    scheduledTime: '12:00',
    duration: 30,
    isNew: true,
    type: 'Exam',
    assignmentsId: 'tochange',
    examId: 'tochange',
});

export const mapFromGraphQL = (task: any): TaskDraft => {
    const date = new Date(task.scheduledAt);
    return {
        id: task.id,
        title: task.title,
        scheduledDate: date.toISOString().split('T')[0],
        scheduledTime: date.toTimeString().slice(0, 5),
        duration: task.duration,
        type: task.type,
        assignmentsId: task.assignmentsId,
        examId: task.examId,
    };
};
