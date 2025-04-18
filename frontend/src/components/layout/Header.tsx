import logo from '../../assets/logo.png';

export function Header() {
    return (
        <header className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 rounded-t-2xl shadow-sm transition-colors">
            <div className="mx-4 px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
                {/* Logo + nom */}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Logo" className="h-10 w-auto" />
                    <div className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
                        StudyTracker
                    </div>
                </div>
            </div>
        </header>
    );
}
