import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCompactINR } from '../../utils/currency';

const data = [
    { name: 'Jan', value: 1000000 },
    { name: 'Feb', value: 1050000 },
    { name: 'Mar', value: 1080000 },
    { name: 'Apr', value: 1120000 },
    { name: 'May', value: 1150000 },
    { name: 'Jun', value: 1245000 },
];

export const NetWorthChart = () => {
    return (
        <div className="h-full w-full">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Net Worth Growth</h3>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
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
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#1d4ed8"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#1d4ed8', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, fill: '#1d4ed8' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
