import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCompactINR } from '../../utils/currency';
import { useEffect, useState } from 'react';
import { getDashboardSummary } from '../../api/dashboard';

export const NetWorthChart = () => {
    const [data, setData] = useState<Array<{name: string; value: number}>>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getDashboardSummary();
                if (res.monthly_series && res.monthly_series.length > 0) {
                    setData(res.monthly_series);
                }
            } catch (err) {
                console.error('Failed to load net worth series', err);
            }
        };
        load();
    }, []);

    const chartData = data.length ? data : [{ name: 'No data', value: 0 }];

    return (
        <div className="h-full w-full animate-fadeIn">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">Net Worth Growth</h3>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickFormatter={(value) => formatCompactINR(value)}
                        />
                        <Tooltip
                            formatter={(value: any) => [new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value), 'Net Worth']}
                            contentStyle={{ 
                                borderRadius: '12px', 
                                border: 'none', 
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)'
                            }}
                        />
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ r: 5, fill: '#3b82f6', strokeWidth: 3, stroke: '#fff' }}
                            activeDot={{ r: 7, fill: '#1d4ed8', stroke: '#fff', strokeWidth: 3 }}
                            animationDuration={1500}
                            animationEasing="ease-in-out"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
