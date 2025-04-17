import { AddEntityForm } from '../../ui';
import {
    CreateChapterDocument, CreateExamDocument,
    CreateSubjectDocument, GetAllChaptersDocument, GetAllExamsDocument,
    GetSubjectsDocument,
    useGetAllChaptersQuery,
    useGetSubjectsQuery
} from "../../../generated/graphql.ts";
import {useMemo, useState} from "react";

interface AddExamFormProps {
    onClose: () => void;
}

const AddExamForm: React.FC<AddExamFormProps> = ({ onClose }) => {
    // todo : duplicate, refactor
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
        { name: 'date', label: 'Date', type: 'datetime-local', required: true },
        { name: 'duration', label: 'Durée (minutes)', type: 'number', required: true },
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
    ].filter(Boolean);

    return (
        <AddEntityForm
            mutation={CreateExamDocument}
            refetchQueries={[{ query: GetAllExamsDocument }]}
            onClose={onClose}
            fields={fields}
            submitLabel="Ajouter un examen"
        />
    );
};

export default AddExamForm;
