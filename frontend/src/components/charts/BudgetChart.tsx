import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { name: 'Housing', value: 15000, color: '#1d4ed8' }, // primary
    { name: 'Food', value: 8000, color: '#3b82f6' }, // blue-500
    { name: 'Transport', value: 5000, color: '#60a5fa' }, // blue-400
    { name: 'Entertainment', value: 3000, color: '#93c5fd' }, // blue-300
    { name: 'Investments', value: 10000, color: '#2563eb' }, // blue-600
    { name: 'Others', value: 4000, color: '#cbd5e1' }, // slate-300
];

export const BudgetChart = () => {
    return (
        <div className="h-full w-full">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Monthly Spending</h3>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: any) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
