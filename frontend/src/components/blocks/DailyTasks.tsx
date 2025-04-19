import { useState } from 'react';
import {
    useGetAtAGlanceQuery,
    useGetTasksByDateQuery,
} from '../../generated/graphql';
import {
    getTaskFields,
    defaultTaskDraft,
    mapFromGraphQL,
    TaskDraft,
} from '../../config/taskConfig';
import { EditableEntityList } from '../ui/EditableEntityList';
import { useTaskManager } from '../../hooks/useTaskManager';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { addDays, subDays, format, isToday } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-circular-progressbar/dist/styles.css';
import { getTaskStatus } from '../../utils.ts';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

export function DailyTasks() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendarOpen, setCalendarOpen] = useState(false);
    const formattedDate = selectedDate.toISOString().split('T')[0];

    const { data: taskData, refetch } = useGetTasksByDateQuery({
        variables: { date: formattedDate },
    });
    const { data: glanceData, loading, error } = useGetAtAGlanceQuery();
    const { onSave, onDelete } = useTaskManager(refetch);

    if (loading) return <p className="text-zinc-600 dark:text-zinc-300">Chargement...</p>;
    if (error || !glanceData) return <p className="text-red-500">Erreur de chargement</p>;

    const tasks = taskData?.getTasksByDate || [];
    const completed = tasks.filter((t) => getTaskStatus(t) === 'done').length;
    const percentage =
        tasks.length === 0 ? 100 : Math.round((completed / tasks.length) * 100);
    const mappedTasks = tasks.map(mapFromGraphQL);
    const exams = glanceData.getAllExams || [];
    const assignments = glanceData.getAllAssignments || [];

    const today = new Date();
    const upcomingExams = exams.filter((exam: any) => new Date(exam.date) > today);
    const upcomingAssignments = assignments.filter((a: any) => new Date(a.dueAt) > today);

    return (
        <section className="bg-white dark:bg-zinc-950 rounded-2xl shadow space-y-6">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setSelectedDate(subDays(selectedDate, 1))}
                    className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                    <ChevronLeft />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setCalendarOpen(!calendarOpen)}
                        className="inline-flex items-center gap-2 text-zinc-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                    >
                        <CalendarDays className="w-5 h-5" />
                        {isToday(selectedDate) ? 'Aujourd’hui' : format(selectedDate, 'PPP')}
                    </button>
                    {calendarOpen && (
                        <div className="absolute z-50 mt-2 left-1/2 -translate-x-1/2">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date: Date) => {
                                    setSelectedDate(date);
                                    setCalendarOpen(false);
                                }}
                                inline
                            />
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                    className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                    <ChevronRight />
                </button>
            </div>

            {/* Tâches + progression */}
            <div className="flex items-start gap-6">
                <div className="w-20 h-20">
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                            textSize: '20px',
                            textColor: '#ffffff',
                            pathColor: '#3b82f6', // blue-500
                            trailColor: '#e5e7eb', // zinc-200
                        })}
                    />
                </div>

                <div className="flex-1">
                    <EditableEntityList<TaskDraft>
                        title="Tâches du jour"
                        initialItems={mappedTasks}
                        draftFields={() => defaultTaskDraft(formattedDate)}
                        fields={getTaskFields(upcomingAssignments, upcomingExams)}
                        renderView={(t) => (
                            <>
                                <h3 className="text-md font-bold text-zinc-800 dark:text-white">
                                    {t.title}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    ⏰ {t.scheduledTime} • 🕒 {t.duration} min
                                </p>
                            </>
                        )}
                        onSave={onSave}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </section>
    );
}
