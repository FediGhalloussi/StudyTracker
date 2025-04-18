import { useCreateTaskMutation, useDeleteTaskMutation } from '../generated/graphql';
import { TaskDraft } from '../config/taskConfig';

export function useTaskManager(refetch: () => void) {
    const [createTask] = useCreateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    return {
        onSave: async (task: TaskDraft) => {
            const scheduledAt = new Date(`${task.scheduledDate}T${task.scheduledTime}:00`).toISOString();
            await createTask({ variables: { title: task.title, scheduledAt, duration: task.duration } });
            await refetch();
        },
        onDelete: async (id: string) => {
            await deleteTask({ variables: { id } });
            await refetch();
        },
    };
}
