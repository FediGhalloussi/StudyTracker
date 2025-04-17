import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isToday, addDays, subDays } from 'date-fns';
import { AddButtonPopover } from '../ui';
import AddTaskForm from '../entities/task/TaskForm';
import {Task, useGetTasksByDateQuery} from "../../generated/graphql.ts";
import {getTaskStatus} from "../../utils.ts";

export function DailyTasks() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendarOpen, setCalendarOpen] = useState(false);

    const formattedDate = selectedDate.toISOString().split('T')[0]; // yyyy-mm-dd
    const { data } = useGetTasksByDateQuery({
        variables: {
            date: formattedDate,
        },
    });



    const tasks = data?.getTasksByDate || [];
    const completedTasks = tasks.filter(t => getTaskStatus(t) === 'done').length;
    const percentage = tasks.length === 0 ? 100 : Math.round((completedTasks / tasks.length) * 100);

    const handleChangeDate = (date: Date) => {
        setSelectedDate(date);
        setCalendarOpen(false);
    };

    function getColorTask(task){
        const status = getTaskStatus(task);
        return status === 'done'
            ? 'bg-green-100 border-green-400'
            : status === 'inProgress'
                ? 'bg-yellow-100 border-yellow-400'
                : 'bg-white';
    }


    return (
        <section className="bg-white rounded-xl">
            {/* Top bar navigation */}
            <div className="flex items-center justify-between mb-6 ml-22">
                <button
                    onClick={() => setSelectedDate(subDays(selectedDate, 1))}
                    className="text-gray-600 hover:text-black text-xl px-2"
                >
                    ←
                </button>

                <div className="relative">
                    <button
                        onClick={() => setCalendarOpen(!calendarOpen)}
                        className="text-lg font-semibold text-gray-800 hover:underline"
                    >
                        {isToday(selectedDate) ? 'Today' : format(selectedDate, 'PPP')}
                    </button>

                    {calendarOpen && (
                        <div className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 bg-white border rounded shadow-lg">
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleChangeDate}
                                inline
                            />
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                    className="text-gray-600 hover:text-black text-xl px-2"
                >
                    →
                </button>

                {/* Add task button */}
                <div className="flex justify-end mb-4">
                    <AddButtonPopover>
                        <AddTaskForm date={formattedDate}/>
                    </AddButtonPopover>
                </div>
            </div>



            {/* Circle + tasks */}
            <div className="flex items-start space-x-6">
                <div className="w-20 h-20">
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                            textSize: '20px',
                            pathColor: '#3B82F6',
                            textColor: '#1F2937',
                            trailColor: '#E5E7EB',
                        })}
                    />
                </div>

                <div className="flex-1 space-y-4">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500 text-sm italic">Aucune tâche prévue pour ce jour.</p>
                    ) : (
                        tasks.map(task => (
                            <div key={task.id} className={`p-3 ${getColorTask(task)} rounded-md shadow-sm`}>
                                <p className="text-base font-semibold text-gray-800">{task.title}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(task.scheduledAt).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                    {' - '}
                                    {new Date(new Date(task.scheduledAt).getTime() + task.duration * 60000).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </section>
    );
}
