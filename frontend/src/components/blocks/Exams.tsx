import React from 'react';
import { AddButtonPopover } from '../ui';
import AddExamForm from "../entities/exam/ExamForm.tsx";
import {useGetAllExamsQuery} from "../../generated/graphql.ts";

export const Exams: React.FC = () => {
    const { data, loading, error } = useGetAllExamsQuery();

    if (loading) return <p>Chargement des examens...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    // Filtrage des examens dont la date est postérieure à aujourd'hui
    const today = new Date();
    const upcomingExams = data?.getAllExams.filter(
        (exam) => new Date(exam.date) > today
    ) || [];

    return (
        <section className="relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Upcoming Exams</h2>
                <AddButtonPopover>
                    {/* Composant de formulaire pour ajouter un examen */}
                    <AddExamForm onClose={() => { /* Logique de fermeture du formulaire */ }} />
                </AddButtonPopover>
            </div>
            <ul className="space-y-3">
                {upcomingExams.map((exam) => (
                    <li
                        key={exam.id}
                        className="bg-white border-b border-gray-200 p-4 hover:shadow transition"
                    >
                        <h3 className="text-md font-bold text-gray-900">{exam.subject.name}</h3>
                        <p className="text-sm text-gray-600">
                            🗓️ {new Date(exam.date).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">⏱️ {exam.duration} min</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
