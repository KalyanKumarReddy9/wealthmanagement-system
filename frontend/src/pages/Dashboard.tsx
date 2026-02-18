import { useState, useEffect } from 'react';
import { formatINR } from '../utils/currency';
import { NetWorthChart } from '../components/charts/NetWorthChart';
import { BudgetChart } from '../components/charts/BudgetChart';
import { getDashboardSummary } from '../api/dashboard';
import type { DashboardSummary } from '../api/dashboard';
import { TrendingUp, TrendingDown, DollarSign, Download, Plus } from 'lucide-react';

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

    const handleExport = async () => {
        try {
            // Fetch transactions and build CSV on client-side
            const resp = await fetch('http://localhost:8000/transactions', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
            });
            if (!resp.ok) throw new Error('Failed to fetch transactions for export');
            const items = await resp.json();
            const csvRows = [];
            const headers = ['date','description','category','type','amount'];
            csvRows.push(headers.join(','));
            for (const t of items) {
                csvRows.push([new Date(t.date).toISOString(), '"' + (t.description || '') + '"', t.category, t.type, t.amount].join(','));
            }
            const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `transactions_${new Date().toISOString().slice(0,10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Export failed', err);
            alert((err as any)?.message || 'Export failed');
        }
    };

    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({ amount: '', type: 'expense', category: '', description: '' });

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                amount: Number(form.amount),
                type: form.type as 'income' | 'expense',
                category: form.category,
                description: form.description || undefined
            };
            await (await import('../api/transactions')).createTransaction(payload);
            setShowAdd(false);
            // Refresh summary
            const data = await getDashboardSummary();
            setSummary(data);
        } catch (err) {
            console.error('Add transaction failed', err);
            alert((err as any)?.message || 'Failed to add transaction');
        }
    };

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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 h-96 bg-slate-200 rounded-2xl"></div>
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
                        Financial Overview
                    </h1>
                    <p className="text-slate-600 mt-1">Welcome back{summary?.user_name ? `, ${summary.user_name}` : ''} — here's your wealth summary.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleExport} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 text-slate-700 transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group">
                        <Download className="w-4 h-4 group-hover:animate-bounce" />
                        Export Report
                    </button>
                    <button onClick={() => setShowAdd(true)} className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Transaction
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Net Worth Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp animation-delay-100 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-blue-700">Net Worth</p>
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 animate-countUp">
                            {formatINR(summary?.net_worth || 0)}
                        </h2>
                        <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            Updated just now
                        </p>
                    </div>
                </div>

                {/* Monthly Income Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp animation-delay-200 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-emerald-700">Total Income</p>
                            <div className="bg-emerald-600 p-2 rounded-lg">
                                <DollarSign className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 animate-countUp">
                            {formatINR(summary?.monthly_income || 0)}
                        </h2>
                        <p className="text-slate-600 text-sm">All time</p>
                    </div>
                </div>

                {/* Monthly Expenses Card */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp animation-delay-300 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-red-700">Total Expenses</p>
                            <div className="bg-red-600 p-2 rounded-lg">
                                <TrendingDown className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 animate-countUp">
                            {formatINR(summary?.monthly_expenses || 0)}
                        </h2>
                        <p className="text-red-600 text-sm font-medium flex items-center gap-1">
                            <TrendingDown className="w-4 h-4" />
                            All time
                        </p>
                    </div>
                </div>
            </div>

            {/* Add Transaction Modal */}
            {showAdd && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Add Transaction</h3>
                        <form onSubmit={handleAddSubmit} className="space-y-3">
                            <div>
                                <label className="text-sm">Amount</label>
                                <input required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} type="number" step="0.01" className="w-full mt-1 p-2 border rounded" />
                            </div>
                            <div>
                                <label className="text-sm">Type</label>
                                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full mt-1 p-2 border rounded">
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm">Category</label>
                                <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full mt-1 p-2 border rounded" />
                            </div>
                            <div>
                                <label className="text-sm">Description (optional)</label>
                                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full mt-1 p-2 border rounded" />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 rounded border">Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px] hover:shadow-lg transition-all duration-300 animate-fadeInLeft animation-delay-400">
                    <NetWorthChart />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px] hover:shadow-lg transition-all duration-300 animate-fadeInRight animation-delay-400">
                    <BudgetChart />
                </div>
            </div>

        </div>
    );
};
