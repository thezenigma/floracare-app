import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useScrollNavigate } from '../hooks/useScrollNavigate';

export default function Onboarding() {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    
    useScrollNavigate({ prevPath: null, nextPath: '/tutorial' });

    return (
        <div className="min-h-screen bg-background text-on-background flex flex-col relative overflow-x-hidden transition-colors duration-500">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 pointer-events-none">
                <div className="max-w-[1280px] mx-auto flex justify-between items-center w-full pointer-events-auto">
                    <div className="flex items-center group cursor-pointer">
                        <span className="material-symbols-outlined text-primary text-3xl mr-2">eco</span>
                        <span className="font-bold text-xl text-primary">FloraCare</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleTheme} 
                            className="flex items-center justify-center p-2 rounded-full border border-primary/20 hover:bg-primary/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-on-surface">
                                {isDark ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col justify-center items-center px-8 pt-32 pb-20 text-center max-w-4xl mx-auto w-full z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 mb-8">
                    <span className="material-symbols-outlined text-primary text-[18px]">eco</span>
                    <span className="font-label-md text-sm text-on-background tracking-wider uppercase opacity-80">Welcome to FloraCare</span>
                </div>
                
                <h1 className="font-display-lg text-5xl md:text-6xl text-on-background mb-6 font-bold leading-tight">
                    Cultivate Your <br/> <span className="text-primary">Digital Sanctuary</span>
                </h1>
                
                <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mb-12">
                    Transform plant care into a mindful routine. Monitor health, receive critical alerts, and manage your botanical collection with professional precision.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => navigate('/tutorial', { state: { direction: 'down' } })} className="bg-primary text-on-primary font-label-md px-10 py-4 rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity cursor-pointer">
                        Continue to Tutorial
                    </button>
                </div>
            </main>
        </div>
    );
}
