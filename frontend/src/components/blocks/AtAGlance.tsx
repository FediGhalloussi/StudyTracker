import { useGetAtAGlanceQuery } from '../../generated/graphql.ts';
import { DataSection } from '../ui';
import { getTaskStatus } from '../../utils.ts';

export function AtAGlance() {
    const { data, loading, error } = useGetAtAGlanceQuery();
    const tasks = data?.getAllTasks || [];
    const exams = data?.getAllExams || [];

    if (loading) return <p className="text-zinc-600 dark:text-zinc-300">Chargement...</p>;
    if (error) return <p className="text-red-500">Erreur : {error.message}</p>;

    const tasksDue = tasks.filter((task: any) => getTaskStatus(task) !== 'done').length;

    const today = new Date();
    const upcomingExams = exams.filter((exam: any) => new Date(exam.date) > today).length;

    const totalMinutes = tasks
        .filter((task: any) => getTaskStatus(task) === 'done')
        .reduce((sum: number, task: any) => sum + task.duration, 0);

    const hoursStudied = Math.round(totalMinutes / 60);

    const blocks = [
        {
            count: tasksDue,
            label: 'Tâches\nÀ faire',
            color: 'bg-red-50 dark:bg-red-900/40 text-red-900 dark:text-red-200',
            colorRound: 'bg-red-100 dark:bg-red-700 text-red-700 dark:text-white',
        },
        {
            count: upcomingExams,
            label: 'Examens\nÀ venir',
            color: 'bg-blue-50 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200',
            colorRound: 'bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white',
        },
        {
            count: hoursStudied,
            label: 'Heures\nÉtudiées',
            color: 'bg-green-50 dark:bg-green-900/40 text-green-900 dark:text-green-200',
            colorRound: 'bg-green-100 dark:bg-green-700 text-green-700 dark:text-white',
        },
    ];

    return (
        <DataSection title="En un coup d'oeil" loading={loading} error={error}>
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-4">
                At a Glance
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {blocks.map((item) => (
                    <div
                        key={item.label}
                        className={`aspect-square rounded-xl shadow border border-zinc-200 dark:border-zinc-700 p-4 flex flex-col items-start justify-start ${item.color}`}
                    >
                        <div
                            className={`text-3xl font-bold rounded-full px-4 py-2 mb-3 ${item.colorRound}`}
                        >
                            {item.count}
                        </div>
                        <p className="text-sm font-medium leading-snug whitespace-pre-line">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </DataSection>
    );
}
