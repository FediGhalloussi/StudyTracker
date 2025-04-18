import { Header } from '../components/layout/Header.tsx';
import { AtAGlance } from '../components/blocks/AtAGlance.tsx';
import { Assignments } from '../components/blocks/Assignments.tsx';
import { Exams } from '../components/blocks/Exams.tsx';
import { DailyTasks } from '../components/blocks/DailyTasks.tsx';

export function Dashboard() {
    return (
        <div
            className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 min-h-screen rounded-2xl my-8 mx-4 md:mx-16 shadow-xl transition-colors"
            style={{ minHeight: 'calc(100vh - 4rem)' }}
        >
            <Header />

            <main className="m-6 md:m-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Colonne principale (2/3) */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 shadow-sm p-6">
                            <DailyTasks />
                        </div>

                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 shadow-sm p-6">
                            <Assignments />
                        </div>
                    </div>

                    {/* Colonne secondaire (1/3) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 shadow-sm p-6">
                            <AtAGlance />
                        </div>
                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 shadow-sm p-6">
                            <Exams />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
