import {
    CreateAssignmentDocument,
    GetAllAssignmentsDocument,
    CreateExamDocument,
    GetAllExamsDocument
} from '../generated/graphql';
import { FieldDescriptor } from '../components/ui/EditableEntityList';
import { v4 as uuidv4 } from 'uuid';

export interface TaskDraft {
    id: string;
    title: string;
    type: 'EXAM' | 'ASSIGNMENT';
    scheduledAt: string;
    duration: number;
    assignmentId?: string;
    examId?: string;
    isNew?: boolean;
}

interface RelatedOption {
    id: string;
    title?: string;
}

export const defaultTaskDraft = (): TaskDraft => ({
    id: uuidv4(),
    title: '',
    type: 'ASSIGNMENT',
    scheduledAt: new Date().toISOString(), // format 'yyyy-MM-ddTHH:mm'
    duration: 60,
    isNew: true,
});

export const mapFromGraphQL = (task: any): TaskDraft => {
    return {
        id: task.id,
        title: task.title,
        type: task.type,
        scheduledAt: new Date(task.scheduledAt).toISOString(),
        duration: task.duration,
        assignmentId: task.assignment ? task.assignment.id : undefined,
        examId: task.exam ? task.exam.id : undefined,
    };
};

export const getTaskFields = (
    assignments: RelatedOption[],
    exams: RelatedOption[]
): FieldDescriptor<TaskDraft>[] => [
    { key: 'title', label: 'Titre', type: 'text', required: true },
    {
        key: 'type',
        label: 'Type',
        type: 'select',
        required: true,
        options: [
            { value: 'EXAM', label: 'Examen' },
            { value: 'ASSIGNMENT', label: 'Devoir' },
        ],
    },
    {
        key: 'scheduledAt',
        label: 'Date prévue',
        type: 'datetime-local',
        required: true,
    },
    {
        key: 'duration',
        label: 'Durée (minutes)',
        type: 'number',
        required: true,
    },
    {
        key: 'assignmentId',
        label: 'Devoir lié',
        type: 'entity-select',
        required: false,
        visible: (data) => data.type === 'ASSIGNMENT',
        options: assignments.map(a => ({ label: a.title ?? '', value: a.id })),
        mutation: CreateAssignmentDocument,
        refetchQueries: [{ query: GetAllAssignmentsDocument }],
        addLabel: 'Titre du devoir',
        variableName: 'title',
    },
    {
        key: 'examId',
        label: 'Examen lié',
        type: 'entity-select',
        required: false,
        visible: (data) => data.type === 'EXAM',
        options: exams.map((e) => ({
            label: e.chapter
                ? `${e.subject.name} : ${e.chapter.title}`
                : e.subject.name,
            value: e.id,
        })),
        mutation: CreateExamDocument,
        refetchQueries: [{ query: GetAllExamsDocument }],
        addLabel: 'Titre de l’examen',
        variableName: 'title',
    },
];
