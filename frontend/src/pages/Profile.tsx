import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Bell, LogOut } from 'lucide-react';

export const Profile = () => {
    const { user, logout } = useAuth();
    const [riskLevel, setRiskLevel] = useState('medium');

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Profile & Settings</h1>
                <p className="text-slate-600">Manage your account preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Available Actions Sidebar (visually) */}
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4 text-primary text-2xl font-bold">
                            {user?.name.charAt(0)}
                        </div>
                        <h2 className="font-bold text-lg text-slate-900">{user?.name}</h2>
                        <p className="text-sm text-slate-500">{user?.email}</p>
                        <div className="mt-4 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            Verified Investor
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="w-full bg-slate-100 text-slate-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

                {/* Settings Form */}
                <div className="md:col-span-2 space-y-6">
                    {/* Investment Preferences */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold text-slate-900">Investment Profile</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Risk Tolerance</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['low', 'medium', 'high'].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setRiskLevel(level)}
                                            className={`py-2 px-4 rounded-lg text-sm font-medium capitalize border transition-all ${riskLevel === level
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    {riskLevel === 'low' && "Conservative growth. Focus on capital preservation."}
                                    {riskLevel === 'medium' && "Balanced approach. Mix of equity and debt."}
                                    {riskLevel === 'high' && "High growth potential. Significant equity exposure."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Preferences Placeholder */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 opacity-60">
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="w-5 h-5 text-slate-500" />
                            <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
                        </div>
                        <p className="text-sm text-slate-500">Currently unavailable in demo mode.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
