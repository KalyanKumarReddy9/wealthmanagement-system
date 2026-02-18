import { useState, useEffect } from 'react';
import { formatINR } from '../utils/currency';
import { getDashboardSummary } from '../api/dashboard';
import type { DashboardSummary } from '../api/dashboard';
import { TrendingUp, TrendingDown, Target, DollarSign, BarChart3, PiggyBank } from 'lucide-react';

export const Investments = () => {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getDashboardSummary();
                setSummary(data);
            } catch (error) {
                console.error("Failed to fetch investment summary", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    // Mock AI investment suggestions
    const investmentSuggestions = [
        {
            id: 1,
            title: "Diversify Your Portfolio",
            description: "Consider allocating 20% of your portfolio to international stocks for better diversification.",
            risk: "Medium",
            potentialReturn: "8-12%",
            priority: "High"
        },
        {
            id: 2,
            title: "Increase Emergency Fund",
            description: "Your emergency fund covers only 2 months of expenses. Aim for 6 months.",
            risk: "Low",
            potentialReturn: "Financial Security",
            priority: "Medium"
        },
        {
            id: 3,
            title: "Tax-saving Investments",
            description: "Consider investing ₹1.5L in ELSS funds to save tax under section 80C.",
            risk: "Low",
            potentialReturn: "Tax Savings + 12-15%",
            priority: "High"
        },
        {
            id: 4,
            title: "Retirement Planning",
            description: "Start SIP of ₹10,000/month in diversified equity funds for retirement.",
            risk: "Medium",
            potentialReturn: "15-20% annually",
            priority: "Medium"
        }
    ];

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
                    <div className="h-96 bg-slate-200 rounded-2xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeInDown">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Investment Overview
                    </h1>
                    <p className="text-slate-600 mt-1">Manage your investments and get AI-powered suggestions.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Assets Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp animation-delay-100 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-blue-700">Total Assets</p>
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <PiggyBank className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 animate-countUp">
                            {formatINR(summary?.total_assets || 0)}
                        </h2>
                        <p className="text-blue-600 text-sm font-medium">Across all investments</p>
                    </div>
                </div>

                {/* Net Worth Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp animation-delay-200 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-emerald-700">Net Worth</p>
                            <div className="bg-emerald-600 p-2 rounded-lg">
                                <DollarSign className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 animate-countUp">
                            {formatINR(summary?.net_worth || 0)}
                        </h2>
                        <p className="text-emerald-600 text-sm font-medium">Assets + (Income - Expenses)</p>
                    </div>
                </div>

                {/* Monthly Savings Card */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp animation-delay-300 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-purple-700">Monthly Savings</p>
                            <div className="bg-purple-600 p-2 rounded-lg">
                                <BarChart3 className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 animate-countUp">
                            {summary?.monthly_income && summary?.monthly_expenses
                                ? formatINR(summary.monthly_income - summary.monthly_expenses)
                                : formatINR(0)}
                        </h2>
                        <p className="text-purple-600 text-sm font-medium">Available for investments</p>
                    </div>
                </div>
            </div>

            {/* AI Investment Suggestions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-fadeInUp animation-delay-400">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">AI Investment Suggestions</h2>
                </div>
                <p className="text-slate-600 mb-6">Personalized recommendations based on your financial situation</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {investmentSuggestions.map((suggestion) => (
                        <div key={suggestion.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-slate-800">{suggestion.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    suggestion.priority === 'High' ? 'bg-red-100 text-red-800' :
                                    suggestion.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {suggestion.priority}
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{suggestion.description}</p>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Risk: <span className="font-medium">{suggestion.risk}</span></span>
                                <span className="text-slate-500">Return: <span className="font-medium">{suggestion.potentialReturn}</span></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Investment Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Investment Allocation</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-slate-700">Equity Funds</span>
                                <span className="text-sm font-medium text-slate-700">40%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: "40%"}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-slate-700">Debt Funds</span>
                                <span className="text-sm font-medium text-slate-700">25%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: "25%"}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-slate-700">Real Estate</span>
                                <span className="text-sm font-medium text-slate-700">20%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{width: "20%"}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-slate-700">Cash & Equivalents</span>
                                <span className="text-sm font-medium text-slate-700">15%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-yellow-600 h-2 rounded-full" style={{width: "15%"}}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Portfolio Return</p>
                                    <p className="font-bold text-slate-900">12.5%</p>
                                </div>
                            </div>
                            <span className="text-green-600 text-sm font-medium">+2.3% this month</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <Target className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Risk Score</p>
                                    <p className="font-bold text-slate-900">Medium</p>
                                </div>
                            </div>
                            <span className="text-blue-600 text-sm font-medium">Optimal</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Projected Growth</p>
                                    <p className="font-bold text-slate-900">₹50L</p>
                                </div>
                            </div>
                            <span className="text-purple-600 text-sm font-medium">in 10 years</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Investment Tips */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl shadow-sm border border-slate-200 animate-fadeInUp animation-delay-500">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Smart Investment Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-2">Start Early</h4>
                        <p className="text-sm text-slate-600">The power of compounding works best when you start investing early.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-2">Diversify</h4>
                        <p className="text-sm text-slate-600">Spread investments across asset classes to reduce risk.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-2">Stay Consistent</h4>
                        <p className="text-sm text-slate-600">Regular investments through SIPs help average costs over time.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};