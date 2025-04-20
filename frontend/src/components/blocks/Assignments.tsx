import {useGetAllAssignmentsQuery, useGetSubjectsQuery,} from "../../generated/graphql";
import {EditableEntityList} from "../ui/EditableEntityList";
import {v4 as uuidv4} from 'uuid';
import {useAssignmentManager} from "../../hooks/useAssignmentManager.ts";
import {AssignmentDraft} from '../../config/assignmentConfig';
import { Status } from "../../generated/graphql";


export const Assignments = () => {
    const { data, refetch } = useGetAllAssignmentsQuery();
    const { data: subjectData } = useGetSubjectsQuery();
    const { onSave, onDelete } = useAssignmentManager(refetch);


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
            title="Devoirs"
            initialItems={mappedAssignments}
            draftFields={(defaults) => ({
                id: uuidv4(),
                title: '',
                dueDate: new Date().toISOString().split('T')[0],
                dueTime: '23:59',
                status: Status.Todo,
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
            onSave={onSave}
            onDelete={onDelete}
        />
    );
};
