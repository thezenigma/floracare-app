import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useScrollNavigate } from '../hooks/useScrollNavigate';
import { supabase } from '../lib/supabase';

export default function AuthPage() {
    const { isDark, toggleTheme } = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [mode, setMode] = useState('login'); // 'login' | 'signup'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // If user is already logged in, redirect to dashboard
    React.useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    // If user is already logged in, redirect to dashboard

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        setSuccess('');
        setShowPassword(false);
    };

    const switchMode = (newMode) => {
        resetForm();
        setMode(newMode);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
        }
        // On success, the useEffect above handles redirect
        setLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name }
            }
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess('Account created! Check your email to confirm, then sign in.');
            resetForm();
            setMode('login');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background text-on-surface flex flex-col transition-colors duration-500 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            {/* Top bar */}
            <header className="w-full px-8 py-6 flex justify-between items-center z-10">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <span className="material-symbols-outlined text-primary text-2xl">eco</span>
                    <span className="font-bold text-lg text-primary tracking-tight">FloraCare</span>
                </button>

                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant dark:text-white/60">light_mode</span>
                    <button
                        onClick={toggleTheme}
                        className="w-12 h-6 rounded-full bg-surface-container-high dark:bg-black/40 transition-colors duration-300 focus:outline-none border border-outline-variant/30 dark:border-white/20 relative"
                        aria-label="Toggle theme"
                    >
                        <div className={`absolute top-[3px] left-1 w-[14px] h-[14px] rounded-full bg-primary dark:bg-[#a5f3a1] transition-transform duration-300 ${isDark ? 'translate-x-6' : ''}`} />
                    </button>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant dark:text-white/60">dark_mode</span>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center px-4 py-6 md:py-12 z-10">
                <div className="w-full max-w-4xl flex flex-col items-center">

                    {/* Card */}
                    <div className="w-full bg-surface border border-outline-variant/30 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[auto] md:min-h-[600px]">
                        
                        {/* Left Image Section */}
                        <div className="hidden md:block md:w-1/2 relative bg-surface-container-high">
                            <img 
                                src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800" 
                                alt="Aesthetic plant"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <h2 className="text-2xl font-bold mb-2">
                                    {mode === 'login' ? 'Welcome Home' : 'Start Your Journey'}
                                </h2>
                                <p className="text-white/80 text-sm">
                                    {mode === 'login' ? 'Your plants have missed you.' : 'Join a community of plant lovers.'}
                                </p>
                            </div>
                        </div>

                        {/* Right Form Section */}
                        <div className="w-full md:w-1/2 flex flex-col">
                            {/* Tab switcher */}
                        <div className="flex border-b border-outline-variant/20 bg-surface-container-low">
                            <button
                                onClick={() => switchMode('login')}
                                className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${
                                    mode === 'login'
                                        ? 'text-primary border-b-2 border-primary bg-surface'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => switchMode('signup')}
                                className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${
                                    mode === 'signup'
                                        ? 'text-primary border-b-2 border-primary bg-surface'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                Create Account
                            </button>
                        </div>

                        <div className="p-6 md:p-10 flex-1 flex flex-col justify-center">
                            {/* Heading */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">
                                        {mode === 'login' ? 'lock_open' : 'potted_plant'}
                                    </span>
                                    <h1 className="text-2xl font-bold text-on-surface">
                                        {mode === 'login' ? 'Welcome Back' : 'Join Our Sanctuary'}
                                    </h1>
                                </div>
                                <p className="text-sm text-on-surface-variant">
                                    {mode === 'login'
                                        ? 'Sign in to continue caring for your plants.'
                                        : 'Create your account and start your journey.'}
                                </p>
                            </div>

                            {/* Error / Success banners */}
                            {error && (
                                <div className="mb-5 flex items-start gap-3 bg-error/10 border border-error/30 rounded-xl px-4 py-3">
                                    <span className="material-symbols-outlined text-error text-[18px] mt-0.5 shrink-0">error</span>
                                    <p className="text-sm text-error leading-snug">{error}</p>
                                </div>
                            )}
                            {success && (
                                <div className="mb-5 flex items-start gap-3 bg-primary/10 border border-primary/30 rounded-xl px-4 py-3">
                                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">check_circle</span>
                                    <p className="text-sm text-primary leading-snug">{success}</p>
                                </div>
                            )}

                            {/* Form */}
                            <form
                                onSubmit={mode === 'login' ? handleLogin : handleSignUp}
                                className="space-y-5"
                            >
                                {/* Name — signup only */}
                                {mode === 'signup' && (
                                    <div>
                                        <label className="text-xs font-medium text-on-surface-variant mb-1.5 block uppercase tracking-wider">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ada Lovelace"
                                            required
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            className="w-full bg-background border border-outline-variant/40 rounded-xl px-4 py-3.5 text-[15px] text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>
                                )}

                                {/* Email */}
                                <div>
                                    <label className="text-xs font-medium text-on-surface-variant mb-1.5 block uppercase tracking-wider">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="you@floracare.com"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-background border border-outline-variant/40 rounded-xl px-4 py-3.5 text-[15px] text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="text-xs font-medium text-on-surface-variant mb-1.5 block uppercase tracking-wider">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            required
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="w-full bg-background border border-outline-variant/40 rounded-xl px-4 py-3.5 pr-12 text-[15px] text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                        <button
                                            type="button"
                                            tabIndex={-1}
                                            onClick={() => setShowPassword(v => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm password — signup only */}
                                {mode === 'signup' && (
                                    <div>
                                        <label className="text-xs font-medium text-on-surface-variant mb-1.5 block uppercase tracking-wider">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                required
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                                className="w-full bg-background border border-outline-variant/40 rounded-xl px-4 py-3.5 pr-12 text-[15px] text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Forgot password link */}
                                {mode === 'login' && (
                                    <div className="flex justify-end -mt-2">
                                        <button
                                            type="button"
                                            className="text-xs text-primary hover:underline"
                                            onClick={async () => {
                                                if (!email) { setError('Enter your email above first.'); return; }
                                                setError(''); setLoading(true);
                                                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                                                    redirectTo: `${window.location.origin}/reset-password`
                                                });
                                                setLoading(false);
                                                if (error) setError(error.message);
                                                else setSuccess('Password reset email sent! Check your inbox.');
                                            }}
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-white dark:text-[#002113] py-4 rounded-full font-semibold text-[15px] shadow-lg hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                            {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-[18px]">
                                                {mode === 'login' ? 'login' : 'person_add'}
                                            </span>
                                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Bottom switch */}
                            <p className="text-center text-sm text-on-surface-variant mt-6">
                                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                                {' '}
                                <button
                                    type="button"
                                    onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    {mode === 'login' ? 'Create one' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
