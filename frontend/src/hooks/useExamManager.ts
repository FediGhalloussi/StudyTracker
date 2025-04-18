import { useCreateExamMutation, useDeleteExamMutation } from '../generated/graphql';
import { ExamDraft } from '../config/examConfig';

export function useExamManager(refetch: () => void) {
    const [createExam] = useCreateExamMutation();
    const [deleteExam] = useDeleteExamMutation();

    return {
        onSave: async (exam: ExamDraft) => {
            const date = new Date(`${exam.date}T${exam.time}:00`).toISOString();
            await createExam({
                variables: {
                    date,
                    duration: exam.duration,
                    subjectId: exam.subjectId,
                },
            });
            await refetch();
        },
        onDelete: async (id: string) => {
            await deleteExam({ variables: { id } });
            await refetch();
        },
    };
}
