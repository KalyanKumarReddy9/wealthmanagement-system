import { useState, useEffect } from 'react';
import { formatINR } from '../utils/currency';
import { CheckCircle, Circle, Plus, Target, Sparkles, Calendar, Coins, TrendingUp, DollarSign } from 'lucide-react';
import { getGoals, createGoal } from '../api/goals';
import type { Goal } from '../obj/types';

export const Goals = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddGoal, setShowAddGoal] = useState(false);
    const [planLoading, setPlanLoading] = useState(false);
    const [aiPlan, setAiPlan] = useState<any>(null);
    
    // Form state
    const [goalForm, setGoalForm] = useState({
        name: '',
        target_amount: '',
        deadline: '',
        notes: ''
    });

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
    
    const handleAddGoalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Validate form data
            if (!goalForm.name.trim()) {
                alert('Please enter a goal name');
                return;
            }
            
            if (!goalForm.target_amount || isNaN(parseFloat(goalForm.target_amount)) || parseFloat(goalForm.target_amount) <= 0) {
                alert('Please enter a valid target amount');
                return;
            }
            
            const goalData = {
                name: goalForm.name.trim(),
                target_amount: parseFloat(goalForm.target_amount),
                deadline: goalForm.deadline ? new Date(goalForm.deadline).toISOString() : undefined,
                current_amount: 0, // Initialize with 0
                completed: false  // Initialize as not completed
            };
            
            await createGoal(goalData);
            
            // Reset form
            setGoalForm({
                name: '',
                target_amount: '',
                deadline: '',
                notes: ''
            });
            
            // Close modal and refresh goals
            setShowAddGoal(false);
            const data = await getGoals();
            setGoals(data);
            
            // Generate AI plan
            generateAIPlan();
        } catch (err) {
            console.error('Failed to add goal', err);
            alert(`Failed to add goal: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };
    
    const generateAIPlan = async () => {
        try {
            setPlanLoading(true);
            
            const { generateFinancialPlan } = await import('../api/dashboard');
            const planData = await generateFinancialPlan();
            setAiPlan(planData);
        } catch (err) {
            console.error('Error generating AI plan', err);
            // Optionally set a default plan if the API call fails
            setAiPlan({
                goal_allocation_plan: [],
                investment_recommendations: [],
                income_expense_optimization: []
            });
        } finally {
            setPlanLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeInDown">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Financial Goals</h1>
                    <p className="text-slate-600 mt-1">Track and achieve your dreams.</p>
                </div>
                <button onClick={() => setShowAddGoal(true)} className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Goal
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="flex justify-center items-center gap-2 text-slate-500">
                        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading goals...</span>
                    </div>
                </div>
            ) : goals.length === 0 ? (
                <div className="text-center py-16 animate-fadeInUp">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="text-slate-600 mb-4 text-lg">No goals set yet.</p>
                    <button onClick={() => setShowAddGoal(true)} className="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all hover:shadow-lg hover:-translate-y-0.5 font-medium">
                        Create your first goal
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal, index) => {
                        const progress = Math.min(100, Math.round((goal.current_amount / goal.target_amount) * 100));
                        return (
                            <div 
                                key={goal.id} 
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group animate-fadeInUp overflow-hidden relative"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                
                                <div className="flex items-start justify-between mb-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                                            goal.completed 
                                                ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30' 
                                                : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30 group-hover:scale-110'
                                        }`}>
                                            <Target className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{goal.name}</h3>
                                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                                {goal.deadline ? `By ${new Date(goal.deadline).toLocaleDateString('en-IN')}` : 'No Deadline'}
                                            </p>
                                        </div>
                                    </div>
                                    {goal.completed ? (
                                        <div className="relative">
                                            <CheckCircle className="w-6 h-6 text-green-500 animate-scaleIn" />
                                            <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                                        </div>
                                    ) : (
                                        <Circle className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />
                                    )}
                                </div>

                                <div className="mt-auto relative z-10">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-700 font-semibold">{formatINR(goal.current_amount)}</span>
                                        <span className="text-slate-500">of {formatINR(goal.target_amount)}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                                goal.completed 
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                                            }`}
                                            style={{ 
                                                width: `${progress}%`,
                                                transform: 'scaleX(1)',
                                                transformOrigin: 'left'
                                            }}
                                        />
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className={`text-xs font-bold ${goal.completed ? 'text-green-600' : 'text-blue-600'}`}>
                                            {progress}% Complete
                                        </span>
                                        {goal.completed && (
                                            <span className="text-xs font-medium text-green-600 flex items-center gap-1 animate-fadeInRight">
                                                <Sparkles className="w-3 h-3" />
                                                Achieved!
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            
            {/* AI Financial Plan Section */}
            {aiPlan && (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl shadow-sm border border-slate-200 animate-fadeInUp">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-bold text-slate-900">AI Financial Plan</h2>
                    </div>
                    <p className="text-slate-600 mb-4">Personalized plan based on your goals and financial situation</p>
                    
                    <div className="space-y-4">
                        {aiPlan.goal_allocation_plan && aiPlan.goal_allocation_plan.length > 0 && (
                            <div className="bg-white p-4 rounded-xl border border-slate-200">
                                <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                    <Coins className="w-4 h-4" /> Goal Allocation Plan
                                </h3>
                                <div className="space-y-2">
                                    {aiPlan.goal_allocation_plan.map((plan: any, index: number) => (
                                        <div key={index} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                                            <span className="text-sm">{plan.goal_name}</span>
                                            <span className="text-sm font-medium">₹{plan.monthly_contribution?.toLocaleString('en-IN')} / month</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {aiPlan.investment_recommendations && aiPlan.investment_recommendations.length > 0 && (
                            <div className="bg-white p-4 rounded-xl border border-slate-200">
                                <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" /> Investment Recommendations
                                </h3>
                                <ul className="space-y-1">
                                    {aiPlan.investment_recommendations.map((rec: string, index: number) => (
                                        <li key={index} className="text-sm text-slate-600">• {rec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {aiPlan.income_expense_optimization && aiPlan.income_expense_optimization.length > 0 && (
                            <div className="bg-white p-4 rounded-xl border border-slate-200">
                                <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                    <Target className="w-4 h-4" /> Optimization Suggestions
                                </h3>
                                <ul className="space-y-1">
                                    {aiPlan.income_expense_optimization.map((suggestion: string, index: number) => (
                                        <li key={index} className="text-sm text-slate-600">• {suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Add Goal Modal */}
            {showAddGoal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Add New Goal</h3>
                        <form onSubmit={handleAddGoalSubmit} className="space-y-3">
                            <div>
                                <label className="text-sm">Goal Name</label>
                                <input 
                                    required 
                                    value={goalForm.name} 
                                    onChange={(e) => setGoalForm({...goalForm, name: e.target.value})} 
                                    className="w-full mt-1 p-2 border rounded" 
                                    placeholder="e.g., Buy a car, Vacation, Emergency fund"
                                />
                            </div>
                            <div>
                                <label className="text-sm">Target Amount (₹)</label>
                                <input 
                                    required 
                                    type="number" 
                                    step="0.01" 
                                    value={goalForm.target_amount} 
                                    onChange={(e) => setGoalForm({...goalForm, target_amount: e.target.value})} 
                                    className="w-full mt-1 p-2 border rounded" 
                                    placeholder="e.g., 500000"
                                />
                            </div>
                            <div>
                                <label className="text-sm">Deadline (optional)</label>
                                <input 
                                    type="date" 
                                    value={goalForm.deadline} 
                                    onChange={(e) => setGoalForm({...goalForm, deadline: e.target.value})} 
                                    className="w-full mt-1 p-2 border rounded" 
                                />
                            </div>
                            <div>
                                <label className="text-sm">Notes (optional)</label>
                                <textarea 
                                    value={goalForm.notes} 
                                    onChange={(e) => setGoalForm({...goalForm, notes: e.target.value})} 
                                    className="w-full mt-1 p-2 border rounded" 
                                    rows={2}
                                    placeholder="Any additional details about this goal"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowAddGoal(false)} className="px-4 py-2 rounded border">Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Create Goal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
