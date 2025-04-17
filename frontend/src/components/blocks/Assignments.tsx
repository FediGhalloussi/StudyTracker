import { AddButtonPopover } from '../ui';
import { DataSection } from '../ui';
import { EntityTable } from '../ui';
import AddAssignmentForm from "../entities/assignment/AssignmentForm.tsx";
import {Assignment, useGetAllAssignmentsQuery} from "../../generated/graphql.ts";

export const Assignments = () => {
    const { data, loading, error } = useGetAllAssignmentsQuery();
    const assignments = data?.getAllAssignments || [];

    const renderAssignmentRow = (assignment: Assignment) => {
        const dueDate = new Date(assignment.dueAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
        return (
            <>
                <td className="p-4 text-sm text-gray-900 font-semibold">{assignment.title}</td>
                <td className="p-4 text-sm text-gray-700">{assignment.subject.name}</td>
                <td className="p-4 text-sm text-gray-700">{dueDate}</td>
                <td className="p-4 text-sm">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {assignment.status}
          </span>
                </td>
            </>
        );
    };

    return (
        <DataSection title="Assignments" loading={loading} error={error}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Assignments</h2>
                <AddButtonPopover>
                    <AddAssignmentForm/>
                </AddButtonPopover>
            </div>
            <EntityTable
                headers={['Course', 'Subject', 'Due Date', 'Status']}
                data={assignments}
                rowRenderer={renderAssignmentRow}
            />
        </DataSection>
    );
};
