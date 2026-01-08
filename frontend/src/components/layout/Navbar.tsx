import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 fixed top-0 w-full z-10">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 rounded-lg lg:hidden">
                    <Menu className="w-6 h-6 text-slate-600" />
                </button>
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <span className="text-primary font-bold text-xl">WM</span>
                    </div>
                    <span className="font-bold text-slate-800 text-lg hidden sm:block">Wealth Manager</span>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden md:block">{user?.name || 'User'}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
                    title="Logout"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};
