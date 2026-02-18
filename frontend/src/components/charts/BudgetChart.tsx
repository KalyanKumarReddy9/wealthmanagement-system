import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { getDashboardSummary } from '../../api/dashboard';

const COLORS = ['#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd', '#2563eb', '#cbd5e1', '#f97316', '#ef4444', '#8b5cf6', '#ec4899'];

export const BudgetChart = () => {
    const [data, setData] = useState<Array<{name: string; value: number; color: string}>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getDashboardSummary();
                if (res.category_expenses && res.category_expenses.length > 0) {
                    // Map category expenses to pie chart data with colors
                    const chartData = res.category_expenses.slice(0, 10).map((cat, index) => ({
                        name: cat.name,
                        value: cat.value,
                        color: COLORS[index % COLORS.length]
                    }));
                    setData(chartData);
                }
            } catch (err) {
                console.error('Failed to load budget data', err);
                // Fallback to sample data
                setData([
                    { name: 'Housing', value: 15000, color: COLORS[0] },
                    { name: 'Food', value: 8000, color: COLORS[1] },
                    { name: 'Transport', value: 5000, color: COLORS[2] },
                    { name: 'Entertainment', value: 3000, color: COLORS[3] },
                    { name: 'Utilities', value: 4000, color: COLORS[4] },
                ]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="h-full w-full animate-fadeIn animation-delay-200">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">Monthly Spending</h3>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={5}
                            dataKey="value"
                            animationDuration={1500}
                            animationEasing="ease-out"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: any) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
                            contentStyle={{ 
                                borderRadius: '12px', 
                                border: 'none', 
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)'
                            }}
                        />
                        <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
