import { useGetAllExamsQuery, useDeleteExamMutation, useCreateExamMutation, useGetSubjectsQuery } from "../../generated/graphql";
import { EditableEntityList } from "../ui/EditableEntityList";
import { v4 as uuidv4 } from 'uuid';

interface ExamDraft {
    id: string;
    date: string;
    time: string;
    duration: number;
    subjectId: string;
    isNew?: boolean;
}

export const Exams = () => {
    const { data, refetch } = useGetAllExamsQuery();
    const { data: subjectData } = useGetSubjectsQuery();
    const [createExam] = useCreateExamMutation();
    const [deleteExam] = useDeleteExamMutation();

    const today = new Date();
    const upcomingExams = data?.getAllExams.filter(
        (exam) => new Date(exam.date) > today
    ) || [];
    const subjects = subjectData?.getSubjects || [];
    const firstSubjectId = subjects[0]?.id || '';

    const mappedExams: ExamDraft[] = upcomingExams.map(e => {
        const date = new Date(e.date);
        return {
            id: e.id,
            date: date.toISOString().split('T')[0],
            time: date.toTimeString().slice(0, 5),
            duration: e.duration,
            subjectId: e.subject.id,
        };
    });

    return (
        <EditableEntityList<ExamDraft>
            title="Exams"
            initialItems={mappedExams}
            draftFields={(defaults) => ({
                id: uuidv4(),
                date: new Date().toISOString().split('T')[0],
                time: '08:00',
                duration: 60,
                subjectId: firstSubjectId,
                isNew: true,
                ...defaults,
            })}
            fields={[
                { key: 'date', label: 'Date', type: 'date' },
                { key: 'time', label: 'Heure', type: 'text' },
                { key: 'duration', label: 'Durée (min)', type: 'text' },
                { key: 'subjectId', label: 'Matière', type: 'select', options: subjects.map(s => ({ label: s.name, value: s.id })) },
            ]}
            renderView={(exam) => (
                <>
                    <h3 className="text-md font-bold text-gray-900">
                        {subjects.find(s => s.id === exam.subjectId)?.name || 'Matière inconnue'}
                    </h3>
                    <p className="text-sm text-gray-600">🗓️ {new Date(`${exam.date}T${exam.time}`).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">⏱️ {exam.duration} min</p>
                </>
            )}
            onSave={async (exam) => {
                const datetime = new Date(`${exam.date}T${exam.time}:00`).toISOString();
                await createExam({
                    variables: {
                        date: datetime,
                        duration: exam.duration,
                        subjectId: exam.subjectId,
                    },
                });
                await refetch();
            }}
            onDelete={async (id) => {
                await deleteExam({ variables: { id } });
                await refetch();
            }}
        />
    );
};
