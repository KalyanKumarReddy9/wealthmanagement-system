import { useState, useEffect } from 'react';
import { formatINR } from '../utils/currency';
import { CheckCircle, Circle, Plus, Target } from 'lucide-react';
import { getGoals } from '../api/goals';
import type { Goal } from '../obj/types';

export const Goals = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const data = await getGoals();
                setGoals(data);
            } catch (error) {
                console.error("Failed to fetch goals", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGoals();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Financial Goals</h1>
                    <p className="text-slate-600">Track and achieve your dreams.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Goal
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500">Loading goals...</div>
            ) : goals.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                    <p>No goals set yet.</p>
                    <button className="mt-4 px-4 py-2 text-primary bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        Create your first goal
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal) => {
                        const progress = Math.min(100, Math.round((goal.current_amount / goal.target_amount) * 100));
                        return (
                            <div key={goal.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-xl ${goal.completed ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-primary'}`}>
                                            <Target className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{goal.name}</h3>
                                            <p className="text-xs text-slate-500">
                                                {goal.deadline ? `By ${new Date(goal.deadline).toLocaleDateString('en-IN')}` : 'No Deadline'}
                                            </p>
                                        </div>
                                    </div>
                                    {goal.completed ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-slate-300" />
                                    )}
                                </div>

                                <div className="mt-auto">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-600 font-medium">{formatINR(goal.current_amount)}</span>
                                        <span className="text-slate-400">of {formatINR(goal.target_amount)}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${goal.completed ? 'bg-green-500' : 'bg-primary'}`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="mt-2 text-right">
                                        <span className={`text-xs font-bold ${goal.completed ? 'text-green-600' : 'text-primary'}`}>{progress}%</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
