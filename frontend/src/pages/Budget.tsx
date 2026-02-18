import { useState, useEffect } from 'react';
import { formatINR } from '../utils/currency';
import { BudgetChart } from '../components/charts/BudgetChart';
import { getDashboardSummary } from '../api/dashboard';
import type { DashboardSummary } from '../api/dashboard';

export const Budget = () => {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getDashboardSummary();
                setSummary(data);
            } catch (error) {
                console.error("Failed to fetch budget summary", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading) {
        return (
            <div className="p-8">
                <div className="space-y-6 animate-pulse">
                    <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-96 bg-slate-200 rounded-2xl"></div>
                        <div className="h-96 bg-slate-200 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeInDown">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Budget Overview
                    </h1>
                    <p className="text-slate-600 mt-1">Track your spending and optimize your financial plan.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Income Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp animation-delay-100 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-emerald-700">Total Income</p>
                            <div className="bg-emerald-600 p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 animate-countUp">
                            {formatINR(summary?.monthly_income || 0)}
                        </h2>
                        <p className="text-slate-600 text-sm">All time income</p>
                    </div>
                </div>

                {/* Total Expenses Card */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp animation-delay-200 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-red-700">Total Expenses</p>
                            <div className="bg-red-600 p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 animate-countUp">
                            {formatINR(summary?.monthly_expenses || 0)}
                        </h2>
                        <p className="text-red-600 text-sm font-medium">All time expenses</p>
                    </div>
                </div>

                {/* Savings Rate Card */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp animation-delay-300 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-purple-700">Savings Rate</p>
                            <div className="bg-purple-600 p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 animate-countUp">
                            {summary?.monthly_income && summary?.monthly_income > 0 
                                ? `${Math.round(((summary.monthly_income - summary.monthly_expenses) / summary.monthly_income) * 100)}%` 
                                : '0%'}
                        </h2>
                        <p className="text-purple-600 text-sm font-medium">of income saved</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px] hover:shadow-lg transition-all duration-300 animate-fadeInLeft animation-delay-400">
                    <BudgetChart />
                </div>
                
                {/* Expense Categories Table */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px] hover:shadow-lg transition-all duration-300 animate-fadeInRight animation-delay-400">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">Expense Breakdown</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Percentage</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {summary?.category_expenses && summary.category_expenses.length > 0 ? (
                                    summary.category_expenses.map((cat, index) => (
                                        <tr key={index} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">{cat.name}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 text-right">{formatINR(cat.value)}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 text-right">
                                                {summary.monthly_expenses > 0 
                                                    ? `${Math.round((cat.value / summary.monthly_expenses) * 100)}%` 
                                                    : '0%'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-3 text-center text-sm text-slate-500">No expenses recorded yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Budget Tips */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl shadow-sm border border-slate-200 animate-fadeInUp animation-delay-500">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Budget Optimization Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-2">Track Subscriptions</h4>
                        <p className="text-sm text-slate-600">Review recurring expenses monthly to identify unused services.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-2">Emergency Fund</h4>
                        <p className="text-sm text-slate-600">Aim to save 3-6 months of expenses for unexpected events.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-2">Expense Categories</h4>
                        <p className="text-sm text-slate-600">Categorize expenses to identify spending patterns and areas for improvement.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};