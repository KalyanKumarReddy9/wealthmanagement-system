import { useState, useEffect } from 'react';
import { formatINR } from '../utils/currency';
import { Filter, Search, Plus } from 'lucide-react';
import { getTransactions } from '../api/transactions';
import type { Transaction } from '../obj/types';

export const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ amount: '', type: 'expense', category: '', description: '' });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const refresh = async () => {
        setLoading(true);
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                amount: Number(form.amount),
                type: form.type as 'income' | 'expense',
                category: form.category,
                description: form.description || undefined
            };
            await (await import('../api/transactions')).createTransaction(payload);
            setShowForm(false);
            setForm({ amount: '', type: 'expense', category: '', description: '' });
            await refresh();
        } catch (err) {
            console.error('Create transaction failed', err);
            alert((err as any)?.message || 'Failed to create transaction');
        }
    };

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'all') return true;
        return t.type === filter;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeInDown">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Transactions</h1>
                    <p className="text-slate-600 mt-1">Manage your income and expenses.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setShowForm(true)} className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add New
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="bg-white/90 p-4 rounded-2xl shadow-sm border border-slate-100 mb-4">
                    <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <input required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Amount" className="p-2 border rounded" />
                        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="p-2 border rounded">
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                        <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="p-2 border rounded" />
                        <div className="flex gap-2">
                            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description (optional)" className="p-2 border rounded flex-1" />
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center animate-fadeInUp animation-delay-100 hover:shadow-md transition-all duration-300">
                <div className="relative w-full sm:w-64 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all hover:border-blue-300 hover:text-blue-600">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <select
                        className="px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Transactions</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fadeInUp animation-delay-200 hover:shadow-lg transition-all duration-300">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex justify-center items-center gap-2 text-slate-500">
                                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                            Loading transactions...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No transactions found.</td>
                                </tr>
                            ) : (
                                filteredTransactions.map((t, index) => (
                                    <tr key={t.id} className="hover:bg-blue-50/50 transition-all duration-300 hover:scale-[1.01] cursor-pointer group animate-fadeInUp" style={{ animationDelay: `${index * 30}ms` }}>
                                        <td className="px-6 py-4 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{new Date(t.date).toLocaleDateString('en-IN')}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{t.description || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-all duration-300">
                                                {t.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-right">
                                            <span className={t.type === 'income' ? 'text-green-600' : 'text-slate-900'}>
                                                {t.type === 'income' ? '+' : '-'} {formatINR(t.amount)}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
