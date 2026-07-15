import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useScrollNavigate } from '../hooks/useScrollNavigate';
import ScrollReveal from '../components/ui/ScrollReveal';
import SignUpModal from '../components/auth/SignUpModal';
import LoginModal from '../components/auth/LoginModal';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
    const [isLoginOpen, setIsLoginOpen] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);
    
    useScrollNavigate({ prevPath: null, nextPath: '/tutorial' });

    return (
        <div className="min-h-screen bg-background text-on-surface flex flex-col transition-colors duration-500 font-sans">
            {/* Navigation */}
            <header className="w-full px-8 py-6 flex justify-between items-center z-50">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">eco</span>
                    <span className="font-bold text-lg text-primary tracking-tight">FloraCare</span>
                </div>
                <div className="flex items-center gap-6 text-on-surface-variant">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant dark:text-white/70">light_mode</span>
                        <button 
                            onClick={toggleTheme} 
                            className="w-12 h-6 rounded-full bg-surface-container-high dark:bg-black/40 transition-colors duration-300 focus:outline-none border border-outline-variant/30 dark:border-white/20 relative"
                        >
                            <div className={`absolute top-[3px] left-1 w-[14px] h-[14px] rounded-full bg-primary dark:bg-[#a5f3a1] transition-transform duration-300 transform flex items-center justify-center ${isDark ? 'translate-x-6' : ''}`}></div>
                        </button>
                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant dark:text-white/70">dark_mode</span>
                    </div>
                    <button onClick={() => setIsSignUpOpen(true)} className="hover:text-primary transition-colors flex items-center">
                        <span className="material-symbols-outlined text-[20px]">person</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col w-full max-w-[1200px] mx-auto px-8 pb-20">
                {/* Hero Section */}
                <section className="flex flex-col lg:flex-row items-center justify-between mt-12 lg:mt-24 gap-16">
                    <div className="flex-1 max-w-xl">
                        <ScrollReveal direction="down" delay={0.2}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-6">
                                <span className="material-symbols-outlined text-[14px] text-primary">eco</span>
                                Welcome to FloraCare
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="left" delay={0.3}>
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-on-surface">
                                Cultivate Your <br/>
                                <span className="text-primary">Digital Sanctuary</span>
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.4}>
                            <p className="text-lg text-on-surface-variant mb-10 max-w-md leading-relaxed">
                                Transform plant care into a mindful routine. Monitor health, receive critical alerts, and manage your botanical collection with professional precision.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.5}>
                            <div className="flex flex-wrap gap-4">
                                <button 
                                    onClick={() => navigate('/tutorial', { state: { direction: 'down' } })} 
                                    className="bg-primary text-on-primary px-8 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition-opacity"
                                >
                                    Get Started
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                    <div className="flex-1 w-full flex justify-center lg:justify-end">
                        <ScrollReveal direction="left" delay={0.6}>
                            <div className="w-full max-w-[500px] aspect-square rounded-[2rem] shadow-2xl overflow-hidden relative border border-outline-variant/20 group">
                                <img 
                                    src="https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=1200&q=80" 
                                    alt="Lush indoor plant" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Features Header */}
                <section className="mt-40 text-center mb-20">
                    <ScrollReveal direction="down">
                        <h2 className="text-3xl font-bold text-on-surface mb-4">Professional Features</h2>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.1}>
                        <p className="text-on-surface-variant">An intelligent command center engineered for the daily rhythms of organic life.</p>
                    </ScrollReveal>
                </section>

                {/* Features Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-24">
                    {/* Feature 1 */}
                    <ScrollReveal direction="up" delay={0.1}>
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <span className="material-symbols-outlined text-[24px]">bar_chart</span>
                            </div>
                            <h3 className="text-xl font-bold text-on-surface">Your Garden</h3>
                            <p className="text-on-surface-variant leading-relaxed max-w-sm">
                                Track total plants, vital health scores, and environmental metrics at a single glance across your entire sanctuary.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Feature 2 */}
                    <ScrollReveal direction="up" delay={0.2}>
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error mb-2">
                                <span className="material-symbols-outlined text-[24px]">warning</span>
                            </div>
                            <h3 className="text-xl font-bold text-on-surface">Critical Alerts</h3>
                            <p className="text-on-surface-variant leading-relaxed max-w-sm">
                                Never miss a watering or pest warning with our intelligent, preemptive notification system.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Feature 3 */}
                    <ScrollReveal direction="up" delay={0.3}>
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <span className="material-symbols-outlined text-[24px]">grid_view</span>
                            </div>
                            <h3 className="text-xl font-bold text-on-surface">Plant Attention Center</h3>
                            <p className="text-on-surface-variant leading-relaxed max-w-sm">
                                A dashboard meticulously designed for immediate, daily plant care tasks. Focus on what needs attention now, moving from data to action.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Feature 4 (Mock UI) */}
                    <ScrollReveal direction="left" delay={0.4}>
                        <div className="bg-surface-container-high rounded-3xl p-6 shadow-sm border border-outline-variant/20 flex flex-col gap-4 h-full justify-center">
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
                    </ScrollReveal>
                </section>

                {/* Bottom CTA */}
                <section className="mt-32 w-full bg-surface-container-high rounded-[2.5rem] p-12 lg:p-16 border-l-[6px] border-primary flex flex-col lg:flex-row gap-12 items-center shadow-lg relative overflow-hidden">
                    <div className="flex-1 flex flex-col gap-6 relative z-10">
                        <ScrollReveal direction="down">
                            <h2 className="text-3xl font-bold text-on-surface">From Data to Action</h2>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.1}>
                            <p className="text-on-surface-variant leading-relaxed max-w-xl">
                                FloraCare goes beyond simple tracking. We analyze environmental conditions and biological needs to provide actionable insights. By translating complex data into simple, daily tasks, we help you transform plant care into a mindful, rewarding routine rather than a chore.
                            </p>
                        </ScrollReveal>
                    </div>
                    <ScrollReveal direction="left" delay={0.3} className="hidden lg:block relative">
                        <div className="w-[300px] h-[300px] rounded-3xl overflow-hidden shadow-xl border border-outline-variant/30">
                            <img 
                                src="https://images.pexels.com/photos/1903965/pexels-photo-1903965.jpeg?auto=compress&cs=tinysrgb&w=800" 
                                alt="Minimalist plant care" 
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    </ScrollReveal>
                </section>

                <div className="w-full flex justify-center mt-12 mb-8">
                    <div className="text-primary font-bold tracking-[0.1em] text-xs flex flex-col items-center gap-2 opacity-80">
                        <span className="uppercase">Scroll down to begin your journey</span>
                        <span className="material-symbols-outlined text-[24px] animate-bounce">keyboard_arrow_down</span>
                    </div>
                </div>

            </main>
            
            <footer className="w-full px-8 py-8 flex justify-between items-center text-xs text-on-surface-variant/50 border-t border-outline-variant/10 mt-auto">
                <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">eco</span>
                    <span>FloraCare</span>
                </div>
                <div>© 2024 FloraCare. All rights reserved.</div>
            </footer>
            
            <SignUpModal 
                isOpen={isSignUpOpen} 
                onClose={() => setIsSignUpOpen(false)} 
                onSwitchToLogin={() => {
                    setIsSignUpOpen(false);
                    setIsLoginOpen(true);
                }} 
            />

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToSignUp={() => {
                    setIsLoginOpen(false);
                    setIsSignUpOpen(true);
                }}
            />
        </div>
    );
}
