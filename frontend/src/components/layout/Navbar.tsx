import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 fixed top-0 w-full z-10 animate-slideInDown shadow-sm">
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleSidebar} 
                    className="p-2 hover:bg-slate-100 rounded-xl lg:hidden transition-all duration-300 hover:scale-110 active:scale-95"
                >
                    <Menu className="w-6 h-6 text-slate-600" />
                </button>
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-slate-800 text-lg hidden sm:block group-hover:text-blue-600 transition-colors">
                        Wealth Manager
                    </span>
                </Link>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden md:block">
                        {user?.name || 'User'}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    className="p-2.5 hover:bg-red-50 rounded-xl text-slate-600 hover:text-red-600 transition-all duration-300 hover:scale-110 active:scale-95 group"
                    title="Logout"
                >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </button>
            </div>
        </header>
    );
};
