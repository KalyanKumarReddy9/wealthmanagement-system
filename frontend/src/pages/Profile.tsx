import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Bell, LogOut, User, Settings as SettingsIcon } from 'lucide-react';

export const Profile = () => {
    const { user, logout } = useAuth();
    const [riskLevel, setRiskLevel] = useState('medium');

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="animate-fadeInDown">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Profile & Settings</h1>
                <p className="text-slate-600 mt-1">Manage your account preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Available Actions Sidebar (visually) */}
                <div className="space-y-4 animate-fadeInLeft">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mx-auto flex items-center justify-center mb-4 text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                                {user?.name.charAt(0)}
                            </div>
                            <h2 className="font-bold text-lg text-slate-900">{user?.name}</h2>
                            <p className="text-sm text-slate-500 mb-4">{user?.email}</p>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-fadeInUp animation-delay-300">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                Verified Investor
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="w-full bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:from-red-50 hover:to-red-100 hover:text-red-600 transition-all duration-300 hover:shadow-md group"
                    >
                        <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        Sign Out
                    </button>
                </div>

                {/* Settings Form */}
                <div className="md:col-span-2 space-y-6">
                    {/* Investment Preferences */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 animate-fadeInRight animation-delay-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2 rounded-xl shadow-lg">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Investment Profile</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Risk Tolerance</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['low', 'medium', 'high'].map((level, index) => (
                                        <button
                                            key={level}
                                            onClick={() => setRiskLevel(level)}
                                            className={`py-3 px-4 rounded-xl text-sm font-medium capitalize border transition-all duration-300 animate-fadeInUp ${riskLevel === level
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg scale-105'
                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-blue-300 hover:scale-105'
                                                }`}
                                            style={{ animationDelay: `${(index + 3) * 100}ms` }}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100 animate-fadeIn">
                                    {riskLevel === 'low' && "💼 Conservative growth. Focus on capital preservation."}
                                    {riskLevel === 'medium' && "⚖️ Balanced approach. Mix of equity and debt."}
                                    {riskLevel === 'high' && "🚀 High growth potential. Significant equity exposure."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Preferences Placeholder */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden animate-fadeInRight animation-delay-400">
                        <div className="absolute inset-0 bg-slate-50 opacity-60"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-slate-300 p-2 rounded-xl">
                                    <Bell className="w-5 h-5 text-slate-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <SettingsIcon className="w-4 h-4 text-slate-400 animate-spin-slow" />
                                <p className="text-sm text-slate-500">Currently unavailable in demo mode.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
