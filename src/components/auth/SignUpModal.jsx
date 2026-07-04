import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }) {
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
                    <h2 className="font-headline-md text-[30px] font-bold text-primary">Join Our Sanctuary</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant active:scale-95"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                    <div>
                        <label className="font-label-sm text-[12px] text-on-surface-variant mb-2 block font-medium">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-background border border-outline-variant/30 rounded-xl p-4 font-body-md text-[16px] text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="font-label-sm text-[12px] text-on-surface-variant mb-2 block font-medium">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full bg-background border border-outline-variant/30 rounded-xl p-4 font-body-md text-[16px] text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            placeholder="gardener@floracare.com"
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
                    
                    <button 
                        type="submit"
                        className="w-full bg-primary text-white dark:text-[#002113] py-4 rounded-full font-label-md text-[16px] shadow-sm hover:opacity-90 transition-all active:scale-[0.98]"
                    >
                        Create Account
                    </button>

                    <div className="flex items-center gap-4 my-4">
                        <div className="flex-1 h-px bg-outline-variant/30"></div>
                        <span className="font-label-sm text-[12px] text-on-surface-variant/50 uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-outline-variant/30"></div>
                    </div>

                    <button 
                        type="button"
                        className="w-full bg-surface-container-lowest hover:bg-surface-container-high text-on-surface py-4 rounded-full font-label-md text-[16px] flex items-center justify-center gap-3 border border-outline-variant/30 transition-all shadow-sm active:scale-[0.98]"
                    >
                        <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWw9kXjwN0mUjw4btoCn7C1cnIKuvQiaw_IH1yIsETepnxduz5z9c-us53QsaS4Qx9JRg2T73NAu0yfPc2gqDspFJAQ7RvhRxy03cHthAED1X2exGSsZ8iYxMCnbQia4dGPaJ_2rU_A163-bfvZzz2LLcfOzR7PR4-TB0yQtik_MskDlSf7jydi5-4mmFA7s80VYqUeAymjmepyk_v53wTEtySr4p87U6UUcN9VFp0zRWKk0-W2KgdN_--cKG2O_T0THkH1xXtsGM"/>
                        Sign up with Google
                    </button>
                    
                    <p className="text-center font-label-sm text-[14px] text-on-surface-variant">
                        Already a gardener? <button type="button" onClick={onSwitchToLogin} className="text-primary hover:underline font-semibold ml-1">Log in</button>
                    </p>
                </form>
            </div>
        </div>
    );
}
