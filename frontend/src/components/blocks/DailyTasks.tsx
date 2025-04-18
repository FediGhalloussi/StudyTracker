import { useState } from 'react';
import {
    useGetAtAGlanceQuery,
    useGetTasksByDateQuery
} from '../../generated/graphql';
import {
    getTaskFields,
    defaultTaskDraft,
    mapFromGraphQL,
    TaskDraft
} from '../../config/taskConfig';
import { EditableEntityList } from '../ui/EditableEntityList';
import { useTaskManager } from '../../hooks/useTaskManager';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { addDays, subDays, format, isToday } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-circular-progressbar/dist/styles.css';
import { getTaskStatus } from '../../utils.ts';

export function DailyTasks() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendarOpen, setCalendarOpen] = useState(false);
    const formattedDate = selectedDate.toISOString().split('T')[0];

    const { data: taskData, refetch } = useGetTasksByDateQuery({
        variables: { date: formattedDate }
    });
    const { data: glanceData, loading, error } = useGetAtAGlanceQuery();
    const { onSave, onDelete } = useTaskManager(refetch);

    if (loading) return <p>Chargement...</p>;
    if (error || !glanceData) return <p>Erreur de chargement</p>;

    const tasks = taskData?.getTasksByDate || [];
    const completed = tasks.filter(t => getTaskStatus(t) === 'done').length;
    const percentage =
        tasks.length === 0 ? 100 : Math.round((completed / tasks.length) * 100);
    const mappedTasks = tasks.map(mapFromGraphQL);

    const exams = glanceData.getAllExams || [];
    const assignments = glanceData.getAllAssignments || [];

    return (
        <section className="bg-white rounded-xl">
            <div className="flex items-center justify-between mb-6 ml-22">
                <button onClick={() => setSelectedDate(subDays(selectedDate, 1))}>←</button>
                <div className="relative">
                    <button onClick={() => setCalendarOpen(!calendarOpen)}>
                        {isToday(selectedDate) ? 'Today' : format(selectedDate, 'PPP')}
                    </button>
                    {calendarOpen && (
                        <div className="absolute z-50 mt-2 left-1/2 -translate-x-1/2">
                            <DatePicker selected={selectedDate} onChange={setSelectedDate} inline />
                        </div>
                    )}
                </div>
                <button onClick={() => setSelectedDate(addDays(selectedDate, 1))}>→</button>
            </div>

            <div className="flex items-start space-x-6">
                <div className="w-20 h-20">
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({ textSize: '20px' })}
                    />
                </div>

                <div className="flex-1">
                    <EditableEntityList<TaskDraft>
                        title="Tâches du jour"
                        initialItems={mappedTasks}
                        draftFields={() => defaultTaskDraft(formattedDate)}
                        fields={getTaskFields(assignments, exams)}
                        renderView={(t) => (
                            <>
                                <h3 className="text-md font-bold">{t.title}</h3>
                                <p className="text-sm text-gray-600">
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
