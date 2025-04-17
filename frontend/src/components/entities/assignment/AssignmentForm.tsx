import React, { useMemo, useState } from 'react';
import { AddEntityForm } from '../../ui';
import {
    useGetAllChaptersQuery,
    useGetSubjectsQuery,
    GetAllChaptersDocument,
    GetSubjectsDocument,
    CreateAssignmentDocument,
    CreateSubjectDocument,
    CreateChapterDocument,
    GetAllAssignmentsDocument
} from '@/generated/graphql';

interface AddAssignmentFormProps {
    onClose?: () => void;
}

const AddAssignmentForm: React.FC<AddAssignmentFormProps> = ({ onClose }) => {
    const { data: subjectData } = useGetSubjectsQuery();
    const { data: chapterData } = useGetAllChaptersQuery();

    const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

    const subjects = subjectData?.getSubjects?.map((s: any) => ({
        value: s.id,
        label: s.name,
    })) || [];

    const chapters = useMemo(() => {
        if (!selectedSubjectId) return [];

        return chapterData?.getAllChapters
            ?.filter((c: any) => c.subject.id === selectedSubjectId)
            .map((c: any) => ({
                value: c.id,
                label: c.title,
            })) || [];
    }, [chapterData, selectedSubjectId]);

    const fields = [
        {
            name: 'title',
            label: 'Titre',
            type: 'text',
            required: true,
        },
        {
            name: 'dueAt',
            label: 'Date et heure limite',
            type: 'datetime-local',
            required: true,
        },
        {
            name: 'subjectId',
            label: 'Matière',
            type: 'entity-select',
            required: true,
            options: subjects,
            mutation: CreateSubjectDocument,
            refetchQueries: [{ query: GetSubjectsDocument }],
            addLabel: 'Nom de la matière',
            mutationVariables:{
            } ,
            onChange: (val: string) => {
                setSelectedSubjectId(val);
            },
        },
        selectedSubjectId && {
            name: 'chapterId',
            label: 'Chapitre (facultatif)',
            type: 'entity-select',
            required: false,
            options: chapters,
            mutation: CreateChapterDocument,
            refetchQueries: [{ query: GetAllChaptersDocument }],
            addLabel: 'Titre du chapitre',
            mutationVariables:{
                subjectId: selectedSubjectId,
            }
        },
        {
            name: 'status',
            label: 'Statut',
            type: 'entity-select',
            required: true,
            options: [
                { value: 'TODO', label: '📌 À faire' },
                { value: 'IN_PROGRESS', label: '⏳ En cours' },
                { value: 'DONE', label: '✅ Terminé' },
            ],
        }
    ].filter(Boolean);

    return (
        <AddEntityForm
            mutation={CreateAssignmentDocument}
            refetchQueries={[{ query: GetAllAssignmentsDocument }]}
            onClose={onClose}
            fields={fields}
            submitLabel="Ajouter un devoir"
        />
    );
};

export default AddAssignmentForm;