import { FieldDescriptor } from '../components/ui/EditableEntityList';
import {
    CreateSubjectDocument,
    GetSubjectsDocument,
} from '../generated/graphql';
import { v4 as uuidv4 } from 'uuid';

export interface ExamDraft {
    id: string;
    date: string;
    time: string;
    duration: number;
    subjectId: string;
    isNew?: boolean;
}

export const defaultExamDraft = (): ExamDraft => ({
    id: uuidv4(),
    date: new Date().toISOString().split('T')[0],
    time: '08:00',
    duration: 60,
    subjectId: '',
    isNew: true,
});

export const mapFromGraphQL = (exam: ExamDraft): ExamDraft => {
    const date = new Date(exam.date);
    return {
        id: exam.id,
        date: date.toISOString().split('T')[0],
        time: date.toTimeString().slice(0, 5),
        duration: exam.duration,
        subjectId: exam.subjectId,
    };
};

export const getExamFields = (
    subjects: { id: string; name: string }[]
): FieldDescriptor<ExamDraft>[] => [
    { key: 'date', label: 'Date', type: 'date', required: true },
    { key: 'time', label: 'Heure', type: 'text', required: true },
    { key: 'duration', label: 'Durée (min)', type: 'number', required: true },
    {
        key: 'subjectId',
        label: 'Matière',
        type: 'entity-select',
        required: true,
        options: subjects.map(s => ({ label: s.name, value: s.id })),
        mutation: CreateSubjectDocument,
        refetchQueries: [{ query: GetSubjectsDocument }],
        addLabel: 'Nom de la matière',
        variableName: 'name',
    },
];
