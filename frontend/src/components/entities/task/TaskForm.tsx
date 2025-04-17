import { AddEntityForm } from '../../ui';
import {
    useCreateAssignmentMutation, useCreateExamMutation,
    useCreateRevisionPlanMutation, useCreateTaskMutation,
    useGetAllAssignmentsQuery,
    useGetAllExamsQuery,
    useGetAllRevisionPlansQuery, useGetTasksQuery
} from "@/generated/graphql";
import React from "react";
import {
    CreateAssignmentDocument,
    CreateExamDocument, CreateRevisionPlanDocument,
    CreateTaskDocument, GetAllAssignmentsDocument,
    GetAllExamsDocument, GetAllRevisionPlansDocument, GetTasksByDateDocument,
    GetTasksDocument
} from "../../../generated/graphql.ts";

interface AddTaskFormProps {
    onClose?: () => void;
    date: string;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onClose, date }) => {
    const { data: revisionPlansData } = useGetAllRevisionPlansQuery();
    const { data: assignmentsData } = useGetAllAssignmentsQuery();
    const { data: examsData } = useGetAllExamsQuery();

    const revisionPlans = revisionPlansData?.revisionPlans?.map((r: any) => ({
        value: r.id,
        label: r.title,
    })) || [];

    const assignments = assignmentsData?.getAllAssignments?.map((a: any) => ({
        value: a.id,
        label: a.title,
    })) || [];

    const exams = examsData?.getAllExams?.map((e: any) => ({
        value: e.id,
        label: `Exam ${e.date}`,
    })) || [];

    const fields = [
        { name: 'title', label: 'Titre', type: 'text', required: true },
        {
            name: 'type',
            label: 'Type',
            type: 'entity-select',
            required: true,
            options: [
                { value: 'EXAM', label: 'Examen' },
                { value: 'ASSIGNMENT', label: 'Devoir' },
            ],
        },
        { name: 'scheduledAt', label: 'Date prévue', type: 'datetime-local', required: true },
        { name: 'duration', label: 'Durée (minutes)', type: 'number', required: true },
        /*{
            name: 'revisionPlanId',
            label: 'Plan de révision',
            type: 'entity-select',
            required: false,
            options: revisionPlans,
            mutation: CreateRevisionPlanDocument,
            refetchQueries: [{ query: GetAllRevisionPlansDocument }],
            addLabel: 'Titre du plan',
            variableName: 'title',
        },*/
        {
            name: 'assignmentId',
            label: 'Devoir lié',
            type: 'entity-select',
            required: false,
            options: assignments,
            mutation: CreateAssignmentDocument,
            refetchQueries: [{ query: GetAllAssignmentsDocument }],
            addLabel: 'Titre du devoir',
            variableName: 'title',
        },
        {
            name: 'examId',
            label: 'Examen lié',
            type: 'entity-select',
            required: false,
            options: exams,
            mutation: CreateExamDocument,
            refetchQueries: [{ query: GetAllExamsDocument }],
            addLabel: 'Nouvel examen',
            variableName: 'title', // à adapter si Exam n'a pas de titre
        },
    ];

    return (
        <AddEntityForm
            mutation={CreateTaskDocument}
            refetchQueries={[{ query: GetTasksByDateDocument,
                variables: {
                    date: date,
                }, }]}
            onClose={onClose}
            fields={fields}
            submitLabel="Ajouter une tâche"
        />
    );
};

export default AddTaskForm;
