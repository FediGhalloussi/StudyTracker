import {
    useGetAllAssignmentsQuery,
    useGetSubjectsQuery,
} from '../../generated/graphql';
import { EditableEntityList } from '../ui/EditableEntityList';
import {
    AssignmentDraft,
    defaultAssignmentDraft,
    getAssignmentFields,
    mapFromGraphQL,
} from '../../config/assignmentConfig';
import { useAssignmentManager } from '../../hooks/useAssignmentManager';

export const Assignments = () => {
    const { data: assignmentData, refetch } = useGetAllAssignmentsQuery();
    const { data: subjectData } = useGetSubjectsQuery();
    const { onSave, onDelete } = useAssignmentManager(refetch);

    const subjects = subjectData?.getSubjects || [];
    const assignments = assignmentData?.getAllAssignments || [];
    const mappedAssignments = assignments.map(mapFromGraphQL);

    return (
        <EditableEntityList<AssignmentDraft>
            title="Assignments"
            initialItems={mappedAssignments}
            draftFields={defaultAssignmentDraft}
            fields={getAssignmentFields(subjects)}
            renderView={(a) => (
                <>
                    <h3 className="text-md font-bold text-gray-900">{a.title}</h3>
                    <p className="text-sm text-gray-600">
                        📅 {new Date(`${a.dueDate}T${a.dueTime}`).toLocaleString()}
                    </p>
                    <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {a.status}
          </span>
                </>
            )}
            onSave={onSave}
            onDelete={onDelete}
        />
    );
};
