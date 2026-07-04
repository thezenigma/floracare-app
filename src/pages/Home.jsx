import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useScrollNavigate } from '../hooks/useScrollNavigate';

export default function Home() {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    
    useScrollNavigate({ prevPath: null, nextPath: '/tutorial' });

    return (
        <div className="min-h-screen bg-background text-on-surface flex flex-col transition-colors duration-500 font-sans">
            {/* Navigation */}
            <header className="w-full px-8 py-6 flex justify-between items-center z-50">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">eco</span>
                    <span className="font-bold text-lg text-primary tracking-tight">FloraCare</span>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant">
                    <button onClick={toggleTheme} className="hover:text-primary transition-colors flex items-center">
                        <span className="material-symbols-outlined text-xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
                    </button>
                    <button className="hover:text-primary transition-colors flex items-center">
                        <span className="material-symbols-outlined text-xl">person</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col w-full max-w-[1200px] mx-auto px-8 pb-20">
                {/* Hero Section */}
                <section className="flex flex-col lg:flex-row items-center justify-between mt-12 lg:mt-24 gap-16">
                    <div className="flex-1 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-6">
                            <span className="material-symbols-outlined text-[14px] text-primary">eco</span>
                            Welcome to FloraCare
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-on-surface">
                            Cultivate Your <br/>
                            <span className="text-primary">Digital Sanctuary</span>
                        </h1>
                        <p className="text-lg text-on-surface-variant mb-10 max-w-md leading-relaxed">
                            Transform plant care into a mindful routine. Monitor health, receive critical alerts, and manage your botanical collection with professional precision.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => navigate('/tutorial', { state: { direction: 'down' } })} 
                                className="bg-primary text-on-primary px-8 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition-opacity"
                            >
                                Get Started
                            </button>
                            <button className="border border-outline-variant text-on-surface px-8 py-3 rounded-full font-semibold hover:bg-surface-variant transition-colors">
                                Explore Features
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 w-full flex justify-center lg:justify-end">
                        <div className="w-full max-w-[500px] aspect-square rounded-[2rem] bg-primary-container shadow-2xl overflow-hidden flex items-center justify-center p-8 border border-outline-variant/20">
                            <div className="w-48 h-48 rounded-full bg-primary/20 blur-3xl absolute"></div>
                            <span className="material-symbols-outlined text-[150px] text-primary relative z-10 drop-shadow-2xl">energy_savings_leaf</span>
                        </div>
                    </div>
                </section>

                {/* Features Header */}
                <section className="mt-40 text-center mb-20">
                    <h2 className="text-3xl font-bold text-on-surface mb-4">Professional Features</h2>
                    <p className="text-on-surface-variant">An intelligent command center engineered for the daily rhythms of organic life.</p>
                </section>

                {/* Features Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-24">
                    {/* Feature 1 */}
                    <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <span className="material-symbols-outlined text-[24px]">bar_chart</span>
                        </div>
                        <h3 className="text-xl font-bold text-on-surface">Your Garden</h3>
                        <p className="text-on-surface-variant leading-relaxed max-w-sm">
                            Track total plants, vital health scores, and environmental metrics at a single glance across your entire sanctuary.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error mb-2">
                            <span className="material-symbols-outlined text-[24px]">warning</span>
                        </div>
                        <h3 className="text-xl font-bold text-on-surface">Critical Alerts</h3>
                        <p className="text-on-surface-variant leading-relaxed max-w-sm">
                            Never miss a watering or pest warning with our intelligent, preemptive notification system.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <span className="material-symbols-outlined text-[24px]">grid_view</span>
                        </div>
                        <h3 className="text-xl font-bold text-on-surface">Plant Attention Center</h3>
                        <p className="text-on-surface-variant leading-relaxed max-w-sm">
                            A dashboard meticulously designed for immediate, daily plant care tasks. Focus on what needs attention now, moving from data to action.
                        </p>
                    </div>

                    {/* Feature 4 (Mock UI) */}
                    <div className="bg-surface-container-high rounded-3xl p-6 shadow-sm border border-outline-variant/20 flex flex-col gap-4">
                        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-error"></div>
                                <span className="font-semibold text-sm text-on-surface">Monstera Deliciosa</span>
                            </div>
                            <span className="text-[10px] font-bold text-error tracking-wider uppercase">Needs Water</span>
                        </div>
                        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span className="font-semibold text-sm text-on-surface">Ficus Elastica</span>
                            </div>
                            <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Optimal</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                                <span className="font-semibold text-sm text-on-surface">Calathea Ornata</span>
                            </div>
                            <span className="text-[10px] font-bold text-tertiary tracking-wider uppercase">Misting Due</span>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="mt-32 w-full bg-surface-container-high rounded-[2.5rem] p-12 lg:p-16 border-l-[6px] border-primary flex flex-col lg:flex-row gap-12 items-center shadow-lg relative overflow-hidden">
                    <div className="flex-1 flex flex-col gap-6 relative z-10">
                        <h2 className="text-3xl font-bold text-on-surface">From Data to Action</h2>
                        <p className="text-on-surface-variant leading-relaxed max-w-xl">
                            FloraCare goes beyond simple tracking. We analyze environmental conditions and biological needs to provide actionable insights. By translating complex data into simple, daily tasks, we help you transform plant care into a mindful, rewarding routine rather than a chore.
                        </p>
                        <button 
                            onClick={() => navigate('/tutorial', { state: { direction: 'down' } })}
                            className="text-primary font-bold tracking-wider text-sm flex items-center gap-2 mt-4 hover:opacity-80 transition-opacity w-fit"
                        >
                            BEGIN YOUR JOURNEY
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                    </div>
                    <div className="hidden lg:block w-[300px] h-[300px] bg-surface-container rounded-3xl opacity-50 relative z-10 border border-outline-variant/30"></div>
                </section>

            </main>
            
            <footer className="w-full px-8 py-8 flex justify-between items-center text-xs text-on-surface-variant/50 border-t border-outline-variant/10 mt-auto">
                <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">eco</span>
                    <span>FloraCare</span>
                </div>
                <div>© 2024 FloraCare. All rights reserved.</div>
            </footer>
        </div>
    );
}
