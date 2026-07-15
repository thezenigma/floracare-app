import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { supabase } from '../../lib/supabase';

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }) {
    const { isDark } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
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
            onClose();
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-surface w-full max-w-md rounded-[2rem] p-8 shadow-xl border border-outline-variant/30 animate-stagger z-10 mx-4">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="font-headline-md text-[30px] font-bold text-primary">Join Our Sanctuary</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant active:scale-95"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form className="space-y-6" onSubmit={handleSignUp}>
                    {error && <div className="text-red-500 font-label-sm">{error}</div>}
                    <div>
                        <label className="font-label-sm text-[12px] text-on-surface-variant mb-2 block font-medium">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-background border border-outline-variant/30 rounded-xl p-4 font-body-md text-[16px] text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            placeholder="Your Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-label-sm text-[12px] text-on-surface-variant mb-2 block font-medium">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full bg-background border border-outline-variant/30 rounded-xl p-4 font-body-md text-[16px] text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            placeholder="gardener@floracare.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-label-sm text-[12px] text-on-surface-variant mb-2 block font-medium">Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-background border border-outline-variant/30 rounded-xl p-4 font-body-md text-[16px] text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white dark:text-[#002113] py-4 rounded-full font-label-md text-[16px] shadow-sm hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                    
                    <p className="text-center font-label-sm text-[14px] text-on-surface-variant">
                        Already a gardener? <button type="button" onClick={onSwitchToLogin} className="text-primary hover:underline font-semibold ml-1">Log in</button>
                    </p>
                </form>
            </div>
        </div>
    );
}
