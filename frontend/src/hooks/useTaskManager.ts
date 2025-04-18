import { useCreateTaskMutation, useDeleteTaskMutation } from '../generated/graphql';
import { TaskDraft } from '../config/taskConfig';

export function useTaskManager(refetch: () => void) {
    const [createTask] = useCreateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    return {
        onSave: async (task: TaskDraft) => {
            const scheduledAt = new Date(task.scheduledAt).toISOString();

            await createTask({
                variables: {
                    title: task.title,
                    type: task.type, // 🟢 nécessaire pour éviter l’erreur
                    scheduledAt,
                    duration: task.duration,
                    assignmentId: task.assignmentId || null,
                    examId: task.examId || null,
                },
            });

            await refetch();
        },

        onDelete: async (id: string) => {
            await deleteTask({ variables: { id } });
            await refetch();
        },
    };
}
