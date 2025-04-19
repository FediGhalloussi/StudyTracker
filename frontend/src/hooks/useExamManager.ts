import {useCreateExamMutation, useDeleteExamMutation, useUpdateExamMutation} from '../generated/graphql';
import {ExamDraft} from '../config/examConfig';

export function useExamManager(refetch: () => void) {
    const [createExam] = useCreateExamMutation();
    const [deleteExam] = useDeleteExamMutation();
    const [updateExam] = useUpdateExamMutation();

    return {
        onSave: async (exam: ExamDraft) => {
            const date = new Date(`${exam.date}T${exam.time}:00`).toISOString();
            if (exam.isNew) {

                await createExam({
                    variables: {
                        date,
                        duration: exam.duration,
                        subjectId: exam.subjectId,
                    },
                });
            } else {
                await updateExam({
                    variables: { id: exam.id,
                        input: {
                        date,
                        duration: exam.duration,
                        subjectId: exam.subjectId,
                        }},
                })
            }
            await refetch();
        },
        onDelete: async (id: string) => {
            await deleteExam({variables: {id}});
            await refetch();
        },
    };
}
