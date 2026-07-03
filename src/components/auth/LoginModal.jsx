import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function LoginModal({ isOpen, onClose }) {
    const { isDark } = useTheme();

    if (!isOpen) return null;

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
                    <h2 className="font-headline-md text-[30px] font-bold text-primary">Welcome Back</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant active:scale-95"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                    <div>
                        <label className="font-label-sm text-[12px] text-on-surface-variant mb-2 block font-medium">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full bg-background border border-outline-variant/30 rounded-xl p-4 font-body-md text-[16px] text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            placeholder="hello@floracare.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="font-label-sm text-[12px] text-on-surface-variant mb-2 block font-medium">Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-background border border-outline-variant/30 rounded-xl p-4 font-body-md text-[16px] text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-outline-variant/50 text-primary focus:ring-primary/20 bg-background" />
                            <span className="font-label-sm text-[12px] text-on-surface-variant">Remember me</span>
                        </label>
                        <a href="#" className="font-label-sm text-[12px] text-primary hover:underline">Forgot password?</a>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-primary text-white dark:text-[#002113] py-4 rounded-full font-label-md text-[16px] shadow-sm hover:opacity-90 transition-all active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                    
                    <p className="text-center font-label-sm text-[14px] text-on-surface-variant">
                        Don't have an account? <a href="#" className="text-primary hover:underline font-semibold">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
