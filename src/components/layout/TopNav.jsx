import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import LoginModal from '../auth/LoginModal';
import SignUpModal from '../auth/SignUpModal';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function TopNav({ onMenuClick }) {
    const { isDark, toggleTheme } = useTheme();
    const { user, signOut } = useAuth();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
                        <div className="relative">
                            <button 
                                onClick={() => user ? setIsDropdownOpen(!isDropdownOpen) : setIsLoginOpen(true)}
                                className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors"
                            >
                                <span className="material-symbols-outlined text-on-surface">person</span>
                            </button>
                            
                            {isDropdownOpen && user && (
                                <div className="absolute right-0 mt-2 w-72 bg-surface rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden z-50">
                                    <div className="p-6 border-b border-outline-variant/30 bg-surface-container-lowest">
                                        <p className="font-headline-sm text-[16px] text-on-surface font-semibold truncate mb-1">{user.user_metadata?.full_name || 'FloraCare User'}</p>
                                        <p className="font-label-sm text-[13px] text-on-surface-variant truncate">{user.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <button 
                                            onClick={() => {
                                                signOut();
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-3 rounded-lg font-label-md text-[14px] text-error hover:bg-error/10 flex items-center gap-3 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">logout</span>
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
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
