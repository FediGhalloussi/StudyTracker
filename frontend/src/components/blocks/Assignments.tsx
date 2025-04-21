import {useGetAllAssignmentsQuery, useGetSubjectsQuery,} from "../../generated/graphql";
import {EditableEntityList} from "../ui/EditableEntityList";
import {useAssignmentManager} from "../../hooks/useAssignmentManager.ts";
import {AssignmentDraft, defaultAssignmentDraft, getAssignmentFields} from '../../config/assignmentConfig';
import {mapFromGraphQL} from "../../config/assignmentConfig.ts";


export const Assignments = () => {
    const { data, refetch } = useGetAllAssignmentsQuery();
    const { data: subjectData } = useGetSubjectsQuery();
    const { onSave, onDelete } = useAssignmentManager(refetch);


    const assignments = data?.getAllAssignments || [];
    const subjects = subjectData?.getSubjects || [];

    const mappedAssignments: AssignmentDraft[] = assignments.map(mapFromGraphQL);

    return (
        <EditableEntityList<AssignmentDraft>
            title="Devoirs"
            noneSentence="Aucune devoir prévu."
            initialItems={mappedAssignments}
            draftFields={defaultAssignmentDraft}
            fields={getAssignmentFields(subjects)}
            onSave={onSave}
            onDelete={onDelete}
        />
    );
};
