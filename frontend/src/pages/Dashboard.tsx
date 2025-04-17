import { Header } from '../components/layout/Header.tsx';
import { AtAGlance } from '../components/blocks/AtAGlance.tsx';
import { Assignments } from '../components/blocks/Assignments.tsx';
import { Exams } from '../components/blocks/Exams.tsx';
import { DailyTasks } from '../components/blocks/DailyTasks.tsx';

export function Dashboard() {
    return (
        <div className="bg-white min-h-screen text-gray-900 rounded-2xl my-8 mx-16 shadow-xl"
             style={{minHeight: 'calc(100vh - 4rem)'}}>            {/* En-tête du dashboard */}
            <Header />

            <main className="m-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Colonne principale (2/3) */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="border border-gray-200 rounded-xl p-6">
                            <DailyTasks />
                        </div>

                        <div className=" rounded-xl shadow p-6">
                            <Assignments />
                        </div>
                    </div>

                    {/* Colonne secondaire (1/3) */}
                    <div className="space-y-6 lg:col-span-2 ">
                        <div className="rounded-xl shadow p-6">
                            <AtAGlance />
                        </div>
                        <div className="rounded-xl shadow p-6">
                            <Exams />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
