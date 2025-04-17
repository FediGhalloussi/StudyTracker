import {useGetAtAGlanceQuery} from "../../generated/graphql.ts";
import {DataSection} from "../ui";
import {getTaskStatus} from "../../utils.ts";

export function AtAGlance() {
    const {data, loading, error} =useGetAtAGlanceQuery();
    const tasks = data?.getAllTasks || [];
    const exams = data?.getAllExams || [];
    const assigments = data?.getAllAssignments || [];

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    const tasksDue = tasks.filter((task: any) => getTaskStatus(task) != 'done').length;

    const today = new Date();
    const upcomingExams = exams.filter((exam: any) => new Date(exam.date) > today).length;
    const upcomingAssignments = assigments.filter((assignment: any) => new Date(assignment.dueAt) > today).length;


    const totalMinutes = tasks
        .filter((task: any) => getTaskStatus(task) == 'done')
        .reduce((sum: number, task: any) => sum + task.duration, 0);


    const hoursStudied = Math.round(totalMinutes / 60);

    const blocks = [
        {
            count: tasksDue,
            label: 'Tasks\nDue',
            color: 'bg-red-50/40 text-black',
            colorRound: 'bg-red-100/75 text-red-700',
        },
        {
            count: upcomingExams,
            label: 'Upcoming\nExams',
            color: 'bg-blue-50/40 text-black',
            colorRound: 'bg-blue-100/75 text-blue-700',
        },
        {
            count: hoursStudied,
            label: 'Hours\nStudied',
            color: 'bg-green-50/40 text-black',
            colorRound: 'bg-green-100/75 text-green-700',
        },
    ];

    return (

        <DataSection title="At A Glance" loading={loading} error={error}>
            <h2 className="text-2xl font-semibold mb-4">At a Glance</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {blocks.map((item) => (
                    <div
                        key={item.label}
                        className={`aspect-square border border-gray-50 rounded-xl shadow p-2 px-4 flex flex-col items-start justify-start text-start ${item.color}`}
                    >
                        <div
                            className={`text-2xl rounded-full px-4 py-2 mb-3 ${item.colorRound}`}
                        >
                            {item.count}
                        </div>
                        <p className="text-md leading-snug">
                            {item.label.split('\n').map((line, idx) => (
                                <span key={idx}>
                    {line}
                                    <br />
                </span>
                            ))}
                        </p>
                    </div>
                ))}

            </div>
        </DataSection>
    );
}
