import { useState, useEffect } from 'react';
import { formatINR } from '../utils/currency';
import { NetWorthChart } from '../components/charts/NetWorthChart';
import { BudgetChart } from '../components/charts/BudgetChart';
import { getDashboardSummary } from '../api/dashboard';
import type { DashboardSummary } from '../api/dashboard';

export const Dashboard = () => {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getDashboardSummary();
                setSummary(data);
            } catch (error) {
                console.error("Failed to fetch dashboard summary", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-slate-500">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Financial Overview</h1>
                    <p className="text-slate-600">Welcome back, here's your wealth summary.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700">
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        + Add Transaction
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Net Worth Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-sm font-medium text-slate-500 mb-1">Net Worth</p>
                    <h2 className="text-3xl font-bold text-slate-900">{formatINR(summary?.net_worth || 0)}</h2>
                    <p className="text-green-600 text-sm mt-2 font-medium">Updated just now</p>
                </div>

                {/* Monthly Income Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Income</p>
                    <h2 className="text-3xl font-bold text-slate-900">{formatINR(summary?.monthly_income || 0)}</h2>
                    <p className="text-slate-400 text-sm mt-2">All time</p>
                </div>

                {/* Monthly Expenses Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Expenses</p>
                    <h2 className="text-3xl font-bold text-slate-900">{formatINR(summary?.monthly_expenses || 0)}</h2>
                    <p className="text-red-500 text-sm mt-2 font-medium">All time</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
                    <NetWorthChart />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
                    <BudgetChart />
                </div>
            </div>

        </div>
    );
};
