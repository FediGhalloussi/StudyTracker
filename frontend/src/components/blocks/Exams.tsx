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
            title="Exams"
            initialItems={mappedExams}
            draftFields={defaultExamDraft}
            fields={getExamFields(subjects)}
            renderView={(exam) => (
                <>
                    <h3 className="text-md font-bold text-gray-900">
                        {subjects.find(s => s.id === exam.subjectId)?.name || 'Matière inconnue'}
                    </h3>
                    <p className="text-sm text-gray-600">
                        🗓️ {new Date(`${exam.date}T${exam.time}`).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">⏱️ {exam.duration} min</p>
                </>
            )}
            onSave={onSave}
            onDelete={onDelete}
        />
    );
};
