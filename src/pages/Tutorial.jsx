import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useScrollNavigate } from '../hooks/useScrollNavigate';

export default function Tutorial() {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    
    useScrollNavigate({ prevPath: '/onboarding', nextPath: '/' });

    return (
        <div className="min-h-screen bg-background text-on-surface flex flex-col relative overflow-x-hidden transition-colors duration-500 pb-32">
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

            <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto pt-32 px-8 min-h-[90vh] justify-center">
                <div className="space-y-6 flex flex-col items-center">
                    <div className="flex items-center group cursor-pointer mb-2">
                        <span className="material-symbols-outlined text-primary text-4xl mr-2">eco</span>
                        <span className="font-bold text-2xl text-primary">FloraCare</span>
                    </div>
                    <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-primary text-glow leading-tight font-bold">
                        Your Digital Sanctuary Awaits
                    </h1>
                    <p className="font-body-lg text-lg text-on-surface-variant max-w-xl mx-auto">
                        Cultivate a thriving indoor garden with precision tools and organic insights. Welcome to the future of botanical care.
                    </p>
                </div>
                
                <div className="mt-32 text-on-surface-variant/70 flex flex-col items-center animate-bounce">
                    <span className="font-label-sm uppercase tracking-widest text-[10px] mb-2">Scroll To Explore</span>
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-full max-w-[1000px] mx-auto px-8 flex flex-col gap-32 py-20">
                {/* Feature 1 */}
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    <div className="flex-1 space-y-4">
                        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-[20px]">dashboard</span>
                        </div>
                        <h2 className="text-2xl font-bold text-on-surface">Health Dashboard & Location Tracking</h2>
                        <p className="text-on-surface-variant text-[15px] leading-relaxed">
                            Our intelligent Health Dashboard tracks watering schedules, fertilizer cycles, and light exposure mapped directly to location-based zones in your home. Predict needs before they become problems.
                        </p>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="aspect-[4/3] rounded-[2rem] bg-surface-container-high border border-outline-variant/20 shadow-lg p-6 flex flex-col gap-4">
                            <div className="w-full h-8 bg-surface-container rounded-full w-2/3"></div>
                            <div className="w-full h-4 bg-surface-container rounded-full w-1/2"></div>
                            <div className="w-full h-4 bg-surface-container rounded-full w-1/3 mb-4"></div>
                            <div className="flex gap-4 mt-auto">
                                <div className="flex-1 h-16 bg-surface-container rounded-2xl"></div>
                                <div className="flex-1 h-16 bg-surface-container rounded-2xl"></div>
                                <div className="flex-1 h-16 bg-surface-container rounded-2xl"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
                    <div className="flex-1 space-y-6">
                        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-[20px]">psychiatry</span>
                        </div>
                        <h2 className="text-2xl font-bold text-on-surface">Advanced AI Intelligence</h2>
                        <p className="text-on-surface-variant text-[15px] leading-relaxed">
                            Experience next-generation botanical care powered by our sophisticated machine learning models:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-on-surface-variant text-[14px]">
                                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                <div><strong className="text-on-surface font-medium">AI Vision Expert:</strong> Instant pest & disease diagnosis from a single photo.</div>
                            </li>
                            <li className="flex gap-3 text-on-surface-variant text-[14px]">
                                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                <div><strong className="text-on-surface font-medium">Automated Analysis:</strong> Continuous tracking of environmental growth factors including humidity, ambient light, and temperature.</div>
                            </li>
                            <li className="flex gap-3 text-on-surface-variant text-[14px]">
                                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                <div><strong className="text-on-surface font-medium">Smart Scheduling:</strong> Personalized care schedules dynamically adapted by machine learning.</div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="aspect-[4/3] rounded-[2rem] bg-surface-container-high border border-outline-variant/20 shadow-lg p-6">
                             <div className="w-full h-full bg-surface-container rounded-2xl flex items-start p-4">
                                <span className="text-[10px] text-on-surface-variant/50 font-medium">AI Interface</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    <div className="flex-1 space-y-4">
                        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-[20px]">forum</span>
                        </div>
                        <h2 className="text-2xl font-bold text-on-surface">RAG-Powered Care Guides & Community</h2>
                        <p className="text-on-surface-variant text-[15px] leading-relaxed">
                            Access hyper-specific, RAG-powered care guides that instantly pull from vast botanical databases to answer your exact questions.
                        </p>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="aspect-[4/3] rounded-[2rem] bg-surface-container-high border border-outline-variant/20 shadow-lg p-6 flex flex-col gap-4 justify-end">
                            <div className="h-14 bg-surface-container rounded-2xl flex items-center px-4 gap-4">
                                <div className="w-6 h-6 rounded-full bg-surface-container-highest"></div>
                                <div className="w-32 h-3 rounded-full bg-surface-container-highest"></div>
                            </div>
                            <div className="h-14 bg-surface-container rounded-2xl flex items-center px-4 gap-4">
                                <div className="w-6 h-6 rounded-full bg-surface-container-highest"></div>
                                <div className="w-24 h-3 rounded-full bg-surface-container-highest"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full max-w-[800px] mx-auto px-8 mt-12">
                <div className="bg-surface-container-high rounded-[2.5rem] p-16 text-center flex flex-col items-center shadow-lg border border-outline-variant/10">
                    <h2 className="text-3xl font-bold text-on-surface mb-8">Ready to Cultivate?</h2>
                    <button 
                        onClick={() => navigate('/', { state: { direction: 'down' } })} 
                        className="font-label-md bg-primary text-on-primary px-8 py-3.5 rounded-full shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        Enter Your Sanctuary
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
