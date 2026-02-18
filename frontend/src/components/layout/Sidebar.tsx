import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, Target, TrendingUp, Receipt, Settings, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import { getDashboardSummary } from '../../api/dashboard';
import { formatINR } from '../../utils/currency';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

export const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
    const [netWorth, setNetWorth] = useState<number | null>(null);
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Overview' },
        { to: '/transactions', icon: Receipt, label: 'Transactions' },
        { to: '/budget', icon: PieChart, label: 'Budgeting' },
        { to: '/goals', icon: Target, label: 'Goals' },
        { to: '/investments', icon: TrendingUp, label: 'Investing' },
        { to: '/profile', icon: Settings, label: 'Settings' },
    ];

    useEffect(() => {
        const fetchNetWorth = async () => {
            try {
                const data = await getDashboardSummary();
                setNetWorth(data.net_worth);
            } catch (error) {
                console.error("Failed to fetch net worth", error);
                setNetWorth(0); // Set to 0 if there's an error
            }
        };

        fetchNetWorth();
    }, []);

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden animate-fadeIn"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Content */}
            <aside className={clsx(
                "fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 z-30 transition-all duration-300 ease-in-out lg:translate-x-0 shadow-lg",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-4 flex flex-col gap-2 h-full overflow-y-auto">
                    <div className="mb-4 animate-fadeInLeft">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -mr-10 -mt-10 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative z-10">
                                <p className="text-xs text-blue-700 uppercase font-semibold mb-1">Net Worth</p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    {netWorth !== null ? formatINR(netWorth) : 'Loading...'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => window.innerWidth < 1024 && closeSidebar()}
                                className={({ isActive }) => clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden animate-fadeInLeft",
                                    isActive
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:-translate-x-1"
                                )}
                                style={{ animationDelay: `${(index + 1) * 50}ms` }}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                        )}
                                        <item.icon className={clsx(
                                            "w-5 h-5 relative z-10 transition-transform duration-300",
                                            isActive ? "scale-110" : "group-hover:scale-110"
                                        )} />
                                        <span className="relative z-10">{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-auto animate-fadeInUp animation-delay-600">
                        {/* Recommendation Card */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -mr-16 -mt-16 opacity-10 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                                    <p className="font-semibold">AI Insight</p>
                                </div>
                                <p className="text-slate-300 text-xs mb-3 leading-relaxed">
                                    {netWorth !== null && netWorth > 0 
                                        ? 'Your financial health is improving. Keep up the good work!' 
                                        : 'Start building your financial foundation today.'}
                                </p>
                                <button 
                                    onClick={() => window.location.hash = '/dashboard'}
                                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group/btn"
                                >
                                    View Insights
                                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};