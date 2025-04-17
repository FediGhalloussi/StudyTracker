import logo from '../../assets/logo.png';

export function Header() {
    return (
        <header className="bg-white border-b border-gray-100 rounded-t-2xl">
            <div className="mx-4 px-6 py-4 flex justify-between items-center">
                {/* Logo + nom à gauche */}
                <div className="flex items-center space-x-3">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                    <div className="text-xl md:text-2xl font-bold text-black">
                        StudyTracker
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-x-6 text-lg font-medium text-gray-700">
                    <a href="#" className="hover:text-indigo-500 transition-colors">Dashboard</a>
                    <a href="#" className="hover:text-indigo-500 transition-colors">Calendar</a>
                    <a href="#" className="hover:text-indigo-500 transition-colors">Reports</a>
                </nav>

                {/* Bouton Log out */}
                <button
                    className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded-md transition-colors"
                >
                    Log out
                </button>
            </div>
        </header>
    );
}
