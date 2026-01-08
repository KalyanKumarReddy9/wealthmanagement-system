import { useState, useEffect } from 'react';
import { formatINR } from '../utils/currency';
import { Filter, Search } from 'lucide-react';
import { getTransactions } from '../api/transactions';
import type { Transaction } from '../obj/types';

export const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

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

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'all') return true;
        return t.type === filter;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
                    <p className="text-slate-600">Manage your income and expenses.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        + Add New
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <select
                        className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 outline-none focus:border-primary"
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
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Description</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-slate-500">Loading transactions...</td>
                                </tr>
                            ) : filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-slate-500">No transactions found.</td>
                                </tr>
                            ) : (
                                filteredTransactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-slate-600">{new Date(t.date).toLocaleDateString('en-IN')}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{t.description || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
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
