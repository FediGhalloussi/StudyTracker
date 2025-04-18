import { useGetAllAssignmentsQuery, useDeleteAssignmentMutation, useCreateAssignmentMutation, useGetSubjectsQuery } from "../../generated/graphql";
import { EditableEntityList } from "../ui/EditableEntityList";
import { v4 as uuidv4 } from 'uuid';

interface AssignmentDraft {
    id: string;
    title: string;
    dueDate: string;
    dueTime: string;
    status: string;
    subjectId: string;
    isNew?: boolean;
}

export const Assignments = () => {
    const { data, loading, error, refetch } = useGetAllAssignmentsQuery();
    const { data: subjectData } = useGetSubjectsQuery();
    const [deleteAssignment] = useDeleteAssignmentMutation();
    const [createAssignment] = useCreateAssignmentMutation();

    const assignments = data?.getAllAssignments || [];
    const subjects = subjectData?.getSubjects || [];
    const firstSubjectId = subjects[0]?.id || '';

    const mappedAssignments: AssignmentDraft[] = assignments.map(a => {
        const date = new Date(a.dueAt);
        return {
            id: a.id,
            title: a.title,
            dueDate: date.toISOString().split('T')[0],
            dueTime: date.toTimeString().slice(0, 5),
            status: a.status,
            subjectId: a.subject.id
        };
    });

    return (
        <EditableEntityList<AssignmentDraft>
            title="Assignments"
            initialItems={mappedAssignments}
            draftFields={(defaults) => ({
                id: uuidv4(),
                title: '',
                dueDate: new Date().toISOString().split('T')[0],
                dueTime: '12:00',
                status: 'TODO',
                subjectId: firstSubjectId,
                isNew: true,
                ...defaults,
            })}
            fields={[
                { key: 'title', label: 'Titre', type: 'text' },
                { key: 'dueDate', label: 'Date limite', type: 'date' },
                { key: 'dueTime', label: 'Heure', type: 'text' },
                { key: 'status', label: 'Statut', type: 'select', options: [
                        { label: 'À faire', value: 'TODO' },
                        { label: 'En cours', value: 'IN_PROGRESS' },
                        { label: 'Terminé', value: 'DONE' },
                    ]},
                { key: 'subjectId', label: 'Matière', type: 'select', options: subjects.map(s => ({ label: s.name, value: s.id })) },
            ]}
            renderView={(a) => (
                <>
                    <h3 className="text-md font-bold text-gray-900">{a.title}</h3>
                    <p className="text-sm text-gray-600">📅 {new Date(`${a.dueDate}T${a.dueTime}`).toLocaleString()}</p>
                    <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {a.status}
          </span>
                </>
            )}
            onSave={async (assignment) => {
                const dueAt = new Date(`${assignment.dueDate}T${assignment.dueTime}:00`).toISOString();
                await createAssignment({
                    variables: {
                        title: assignment.title,
                        dueAt,
                        status: assignment.status,
                        subjectId: assignment.subjectId,
                    },
                });
                await refetch();
            }}
            onDelete={async (id) => {
                await deleteAssignment({ variables: { id } });
                await refetch();
            }}
        />
    );
};
