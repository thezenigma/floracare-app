import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useScrollNavigate } from '../hooks/useScrollNavigate';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useAuth } from '../context/AuthContext';

export default function Tutorial() {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    React.useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    useScrollNavigate({ prevPath: null, nextPath: '/auth' });

    return (
        <div className="min-h-screen bg-background text-on-surface flex flex-col relative overflow-x-hidden transition-colors duration-500 pb-32">
            {/* Top Navigation Overlay */}
            <div className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-end">
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
            </div>

            {/* Welcome Section */}
            <ScrollReveal>
                <div className="w-full min-h-screen bg-background dark:bg-[#0b140c] flex flex-col items-center justify-center relative px-8 z-10 transition-colors duration-500">
                    <div className="flex flex-col items-center text-center">
                        {/* Centered Logo - Larger */}
                        <div className="flex items-center gap-3 mb-8" style={{ textShadow: isDark ? '0 0 40px rgba(165, 243, 161, 0.4)' : '0 0 40px rgba(0, 108, 75, 0.3)' }}>
                            <span className="material-symbols-outlined text-primary dark:text-[#a5f3a1] text-5xl md:text-6xl transition-colors duration-500">eco</span>
                            <span className="font-bold text-4xl md:text-5xl text-primary dark:text-[#a5f3a1] tracking-tight transition-colors duration-500">FloraCare</span>
                        </div>
                        
                        {/* Headline - Smaller */}
                        <h1 className="text-on-surface dark:text-[#a5f3a1] text-2xl md:text-3xl font-bold tracking-tight mb-6 transition-colors duration-500" style={{ textShadow: isDark ? '0 0 30px rgba(165, 243, 161, 0.2)' : '0 0 30px rgba(0, 108, 75, 0.15)' }}>
                            Your Digital Sanctuary Awaits
                        </h1>
                        
                        <p className="text-on-surface-variant dark:text-[#c1dfc0] text-[15px] md:text-base max-w-[600px] mx-auto leading-relaxed transition-colors duration-500">
                            Cultivate a thriving indoor garden with precision tools and organic insights. Welcome to the future of botanical care.
                        </p>
                    </div>
                    
                    {/* Scroll Indicator */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-on-surface-variant dark:text-[#648462] flex flex-col items-center transition-colors duration-500">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Scroll To Explore</span>
                        {/* Animated Mouse Icon */}
                        <div className="w-[26px] h-[40px] rounded-full border-2 border-primary/40 flex justify-center pt-2 relative opacity-80">
                            <div className="w-1 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full -z-10 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Features Section */}
            <div className="w-full max-w-[1000px] mx-auto px-8 flex flex-col gap-32 py-20">
                {/* Feature 1 */}
                <ScrollReveal direction="left">
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
                        <div className="flex-1 w-full relative group">
                            <div className="aspect-[4/3] rounded-[2rem] shadow-xl border border-outline-variant/20 overflow-hidden relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80" 
                                    alt="Modern plant care setup" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Feature 2 */}
                <ScrollReveal direction="right">
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
                        <div className="flex-1 w-full relative group">
                            <div className="aspect-[4/3] rounded-[2rem] shadow-xl border border-outline-variant/20 overflow-hidden relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80" 
                                    alt="Detailed plant leaf macro" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Feature 3 */}
                <ScrollReveal direction="up">
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
                        <div className="flex-1 w-full relative group">
                            <div className="aspect-[4/3] rounded-[2rem] shadow-xl border border-outline-variant/20 overflow-hidden relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80" 
                                    alt="Hands tending to plants" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* CTA Section */}
            <ScrollReveal direction="up">
                <div className="w-full max-w-[800px] mx-auto px-8 mt-12">
                    <div className="bg-surface-container-high rounded-[2.5rem] p-16 text-center flex flex-col items-center shadow-lg border border-outline-variant/10">
                        <h2 className="text-3xl font-bold text-on-surface mb-8">Ready to Cultivate?</h2>
                            <div className="flex flex-col items-center gap-6 mt-6">
                                <span className="text-primary font-bold tracking-[0.2em] text-[11px] uppercase opacity-80">
                                    Scroll down to enter your sanctuary
                                </span>
                                
                                {/* Animated Mouse Icon */}
                                <div className="w-[30px] h-[46px] rounded-full border-2 border-primary/40 flex justify-center pt-2 relative opacity-80">
                                    <div className="w-1 h-2 bg-primary rounded-full animate-bounce"></div>
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-primary/20 blur-md rounded-full -z-10 animate-pulse"></div>
                                </div>
                            </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
