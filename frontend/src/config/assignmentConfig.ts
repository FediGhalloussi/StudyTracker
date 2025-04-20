import { FieldDescriptor } from '../components/ui/EditableEntityList';
import {
    CreateSubjectDocument,
    GetSubjectsDocument,
} from '../generated/graphql';
import { v4 as uuidv4 } from 'uuid';

export interface AssignmentDraft {
    id: string;
    title: string;
    dueDate: string;
    dueTime: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    subjectId: string;
    isNew?: boolean;
}

export const defaultAssignmentDraft = (): AssignmentDraft => ({
    id: uuidv4(),
    title: '',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '12:00',
    status: 'TODO',
    subjectId: '',
    isNew: true,
});

export const mapFromGraphQL = (a: AssignmentDraft): AssignmentDraft => {
    const date = new Date(a.dueDate);
    return {
        id: a.id,
        title: a.title,
        dueDate: date.toISOString().split('T')[0],
        dueTime: date.toTimeString().slice(0, 5),
        status: a.status,
        subjectId: a.subjectId,
    };
};

export const getAssignmentFields = (
    subjects: { id: string; name: string }[]
): FieldDescriptor<AssignmentDraft>[] => [
    { key: 'title', label: 'Titre', type: 'text', required: true },
    { key: 'dueDate', label: 'Date limite', type: 'date', required: true },
    { key: 'dueTime', label: 'Heure', type: 'text', required: true },
    {
        key: 'status',
        label: 'Statut',
        type: 'select',
        required: true,
        options: [
            { label: 'À faire', value: 'TODO' },
            { label: 'En cours', value: 'IN_PROGRESS' },
            { label: 'Terminé', value: 'DONE' },
        ],
    },
    {
        key: 'subjectId',
        label: 'Matière',
        type: 'entity-select',
        required: true,
        options: subjects.map(s => ({ value: s.id, label: s.name })),
        mutation: CreateSubjectDocument,
        refetchQueries: [{ query: GetSubjectsDocument }],
        addLabel: 'Nom de la matière',
        variableName: 'name',
    },
];
