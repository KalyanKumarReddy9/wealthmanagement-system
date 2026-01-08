import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, Target, TrendingUp, Receipt, Settings } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

export const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Overview' },
        { to: '/transactions', icon: Receipt, label: 'Transactions' },
        { to: '/budget', icon: PieChart, label: 'Budgeting' },
        { to: '/goals', icon: Target, label: 'Goals' },
        { to: '/investments', icon: TrendingUp, label: 'Investing' },
        { to: '/profile', icon: Settings, label: 'Settings' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Content */}
            <aside className={clsx(
                "fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 z-30 transition-transform duration-300 ease-in-out lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-4 flex flex-col gap-2 h-full overflow-y-auto">
                    <div className="mb-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Net Worth</p>
                            <p className="text-xl font-bold text-primary">₹ 12,45,000</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => window.innerWidth < 1024 && closeSidebar()}
                                className={({ isActive }) => clsx(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-auto">
                        {/* Recommendation Card Placeholder */}
                        <div className="bg-slate-900 text-white p-4 rounded-xl text-sm">
                            <p className="font-semibold mb-2">💡 Quick Tip</p>
                            <p className="text-slate-300 text-xs mb-3">Review your monthly subscriptions to save up to ₹2,000.</p>
                            <button className="text-xs font-semibold text-blue-300 hover:text-blue-200">See Recommendations</button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
