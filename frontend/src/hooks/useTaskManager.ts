import { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } from '../generated/graphql';
import { TaskDraft } from '../config/taskConfig';

export function useTaskManager(refetch: () => void) {
    const [createTask] = useCreateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    return {
        onSave: async (task: TaskDraft) => {
            const scheduledAt = new Date(task.scheduledAt).toISOString();
            if (task.isNew){
                await createTask({
                    variables: {
                        title: task.title,
                        type: task.type,
                        scheduledAt,
                        duration: task.duration,
                        assignmentId: task.assignmentId || null,
                        examId: task.examId || null,
                    },
                });
            }
            else{
                await updateTask({
                    variables: { id: task.id,
                        input: {
                            title: task.title,
                            type: task.type,
                            scheduledAt,
                            duration: task.duration,
                            assignmentId: task.assignmentId || null,
                            examId: task.examId || null,
                            done: false
                        }},
                });
            }

            await refetch();
        },

        onDelete: async (id: string) => {
            await deleteTask({ variables: { id } });
            await refetch();
        },
    };
}
