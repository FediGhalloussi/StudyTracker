import {
    useCreateAssignmentMutation,
    useDeleteAssignmentMutation,
} from '../generated/graphql';
import { AssignmentDraft } from '../config/assignmentConfig';

export function useAssignmentManager(refetch: () => void) {
    const [createAssignment] = useCreateAssignmentMutation();
    const [deleteAssignment] = useDeleteAssignmentMutation();

    return {
        onSave: async (assignment: AssignmentDraft) => {
            const dueAt = new Date(`${assignment.dueDate}T${assignment.dueTime}:00`).toISOString();
            await createAssignment({
                variables: {
                    title: assignment.title,
                    dueAt,
                    status: assignment.status,
                    duration: assignment.duration,
                    subjectId: assignment.subjectId,
                },
            });
            await refetch();
        },
        onDelete: async (id: string) => {
            await deleteAssignment({ variables: { id } });
            await refetch();
        },
    };
}
