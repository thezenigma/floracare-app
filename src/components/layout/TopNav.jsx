import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import LoginModal from '../auth/LoginModal';
import SignUpModal from '../auth/SignUpModal';
import { useLocation } from 'react-router-dom';

export default function TopNav({ onMenuClick }) {
    const { isDark, toggleTheme } = useTheme();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const location = useLocation();
    const isAssistant = location.pathname === '/assistant';

    return (
        <>
            <header className="w-full px-4 lg:px-8 py-4 border-b border-outline-variant/30 bg-surface z-40 sticky top-0 transition-colors duration-500">
                <div className="max-w-[1400px] mx-auto flex justify-between lg:justify-end items-center w-full">
                    
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={onMenuClick}
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors"
                    >
                        <span className="material-symbols-outlined text-on-surface">menu</span>
                    </button>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">light_mode</span>
                            <button 
                                onClick={toggleTheme} 
                                className="w-12 h-6 rounded-full bg-surface-container-high transition-colors duration-300 focus:outline-none border border-outline-variant/30 relative"
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-primary transition-transform duration-300 transform flex items-center justify-center ${isDark ? 'translate-x-6' : ''}`}></div>
                            </button>
                            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">dark_mode</span>
                        </div>
                        <button 
                            onClick={() => setIsLoginOpen(true)}
                            className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors"
                        >
                            <span className="material-symbols-outlined text-on-surface">person</span>
                        </button>
                    </div>
                </div>
            </header>

            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
                onSwitchToSignUp={() => {
                    setIsLoginOpen(false);
                    setIsSignUpOpen(true);
                }}
            />

            <SignUpModal
                isOpen={isSignUpOpen}
                onClose={() => setIsSignUpOpen(false)}
                onSwitchToLogin={() => {
                    setIsSignUpOpen(false);
                    setIsLoginOpen(true);
                }}
            />
        </>
    );
}
