import {
    useCreateAssignmentMutation,
    useDeleteAssignmentMutation, useUpdateAssignmentMutation,
} from '../generated/graphql';
import {AssignmentDraft} from '../config/assignmentConfig';

export function useAssignmentManager(refetch: () => void) {
    const [createAssignment] = useCreateAssignmentMutation();
    const [deleteAssignment] = useDeleteAssignmentMutation();
    const [updateAssignment] = useUpdateAssignmentMutation();

    return {
        onSave: async (assignment: AssignmentDraft) => {
            const dueAt = new Date(`${assignment.dueDate}T${assignment.dueTime}:00`).toISOString();
            if (assignment.isNew) {

                await createAssignment({
                    variables: {
                        title: assignment.title,
                        dueAt,
                        status: assignment.status,
                        duration: assignment.duration,
                        subjectId: assignment.subjectId,
                    },
                });
            } else {
                await updateAssignment({
                    variables: { id: assignment.id,
                        input: {
                        title: assignment.title,
                        dueAt,
                        status: assignment.status,
                        duration: assignment.duration,
                        subjectId: assignment.subjectId,
                        }},
                });
            }
            await refetch();
        },
        onDelete: async (id: string) => {
            await deleteAssignment({variables: {id}});
            await refetch();
        },
    };
}
