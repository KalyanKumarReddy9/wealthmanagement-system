import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, TrendingUp, Check } from 'lucide-react';

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (email && password && name) {
            try {
                await signup({ name, email, password });
                // Redirect to login after successful signup
                navigate('/login');
            } catch (err) {
                // Show server-provided error message when available
                const msg = (err as any)?.message || 'Signup failed. Please try again.';
                setError(msg);
            }
        }
    };

    const features = [
        'Track income & expenses',
        'Set financial goals',
        'Visualize net worth',
        'Secure & encrypted',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-60 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-300"></div>
                <div className="absolute -bottom-10 right-40 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-500"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full relative z-10">
                {/* Left side - Features */}
                <div className="hidden md:flex flex-col justify-center animate-fadeInLeft">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 rounded-3xl text-white shadow-2xl">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl w-fit mb-6 animate-scaleIn">
                            <TrendingUp className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Start Your Wealth Journey</h2>
                        <p className="text-blue-100 mb-8">Join thousands managing their finances smarter</p>
                        <div className="space-y-4">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 animate-fadeInLeft"
                                    style={{ animationDelay: `${(idx + 2) * 100}ms` }}
                                >
                                    <div className="bg-white/20 p-1.5 rounded-full">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-white/90">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl animate-fadeInRight border border-white/20">
                    <div className="flex justify-center mb-6 md:hidden animate-scaleIn animation-delay-200">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <div className="text-center mb-8 animate-fadeInUp animation-delay-300">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                            Create Account
                        </h1>
                        <p className="text-slate-600">Start your wealth journey today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm mb-4 animate-fadeInDown">
                                {error}
                            </div>
                        )}
                        <div className="animate-fadeInUp animation-delay-400">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 bg-white/50"
                                    placeholder="Arjun Kumar"
                                    required
                                />
                            </div>
                        </div>

                        <div className="animate-fadeInUp animation-delay-500">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 bg-white/50"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="animate-fadeInUp animation-delay-600">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 bg-white/50"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] animate-fadeInUp animation-delay-700"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="text-center mt-6 text-slate-600 animate-fadeInUp animation-delay-800">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
            `}</style>
        </div>
    );
};
