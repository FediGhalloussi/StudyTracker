import { useGetAllExamsQuery, useGetSubjectsQuery } from '../../generated/graphql';
import { EditableEntityList } from '../ui/EditableEntityList';
import {
    ExamDraft,
    defaultExamDraft,
    mapFromGraphQL,
    getExamFields,
} from '../../config/examConfig';
import { useExamManager } from '../../hooks/useExamManager';

export const Exams = () => {
    const { data, refetch } = useGetAllExamsQuery();
    const { data: subjectData } = useGetSubjectsQuery();
    const { onSave, onDelete } = useExamManager(refetch);

    const today = new Date();
    const upcomingExams = data?.getAllExams.filter(
        (exam) => new Date(exam.date) > today
    ) || [];
    const subjects = subjectData?.getSubjects || [];
    const mappedExams = upcomingExams.map(mapFromGraphQL);

    return (
        <EditableEntityList<ExamDraft>
            title="Examens"
            initialItems={mappedExams}
            draftFields={defaultExamDraft}
            fields={getExamFields(subjects)}
            onSave={onSave}
            onDelete={onDelete}
        />
    );
};
