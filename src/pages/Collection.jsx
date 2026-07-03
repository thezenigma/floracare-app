import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Collection() {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md transition-colors duration-500">
            {/* Header */}
            <header className="w-full px-8 py-4 border-b border-outline-variant/30 bg-surface">
                <div className="max-w-[1280px] mx-auto flex justify-between items-center w-full">
                    <Link to="/" className="flex items-center group cursor-pointer">
                        <span className="material-symbols-outlined text-primary text-3xl mr-2">eco</span>
                        <span className="font-bold text-xl text-primary">FloraCare</span>
                    </Link>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">light_mode</span>
                            <button 
                                onClick={toggleTheme} 
                                className="w-12 h-6 rounded-full bg-surface-container-high transition-colors duration-300 focus:outline-none border border-outline-variant/30 relative"
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-primary transition-transform duration-300 transform flex items-center justify-center ${isDark ? 'translate-x-6' : ''}`}></div>
                            </button>
                        </div>
                        <button className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors">
                            <span className="material-symbols-outlined text-on-surface">person</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-12">
                <button 
                    onClick={() => navigate('/')} 
                    className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md mb-10"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Return to Dashboard
                </button>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="flex flex-col gap-3 max-w-2xl">
                        <h1 className="text-[48px] font-bold text-[#002113] dark:text-primary leading-tight tracking-tight">
                            Aloe Vera Collection
                        </h1>
                        <p className="font-body-lg text-[18px] text-on-surface-variant">
                            Managing your succulent family. Each plant is monitored with botanical precision for optimal growth.
                        </p>
                    </div>
                    <div className="px-6 py-3 bg-primary-container text-on-primary-container rounded-full font-label-md font-bold whitespace-nowrap">
                        2 Plants Active
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Plant 1 */}
                    <div className="bg-surface rounded-[40px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-outline-variant/20 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/plant/aloe1')}>
                        <div className="flex items-center gap-8 w-full md:w-auto">
                            <div className="w-[120px] h-[120px] shrink-0 rounded-full overflow-hidden border-4 border-surface shadow-md">
                                <img src="https://images.unsplash.com/photo-1596547609652-9fc5b8cb007c?q=80&w=400&auto=format&fit=crop" alt="Aloe 1" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[28px] font-bold text-on-surface leading-none">Aloe Vera 1</h2>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                                    <span className="font-label-md text-on-surface-variant">Health: Optimal</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-16 bg-outline-variant/30 mx-4"></div>

                        <div className="flex items-center justify-between w-full md:w-auto gap-8 md:gap-12">
                            <div className="flex flex-col">
                                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mb-1">Last Watered</span>
                                <span className="font-title-lg text-[22px] font-bold text-on-surface">3 Days Ago</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary-container hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <span className="material-symbols-outlined text-[20px]">water_drop</span>
                                </button>
                                <button className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                                <button className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Plant 2 */}
                    <div className="bg-surface rounded-[40px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-outline-variant/20 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/plant/aloe2')}>
                        <div className="flex items-center gap-8 w-full md:w-auto">
                            <div className="w-[120px] h-[120px] shrink-0 rounded-full overflow-hidden border-4 border-surface shadow-md">
                                <img src="https://images.unsplash.com/photo-1577770857321-7f938d87b322?q=80&w=400&auto=format&fit=crop" alt="Aloe 2" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[28px] font-bold text-on-surface leading-none">Aloe Vera 2</h2>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#B27D56]"></div>
                                    <span className="font-label-md text-on-surface-variant">Health: Thirsty</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-16 bg-outline-variant/30 mx-4"></div>

                        <div className="flex items-center justify-between w-full md:w-auto gap-8 md:gap-12">
                            <div className="flex flex-col">
                                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mb-1">Last Watered</span>
                                <span className="font-title-lg text-[22px] font-bold text-[#B27D56]">9 Days Ago</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="w-12 h-12 rounded-full bg-[#B27D56] flex items-center justify-center text-white hover:opacity-90 transition-opacity" onClick={(e) => { e.stopPropagation(); }}>
                                    <span className="material-symbols-outlined text-[20px]">water_drop</span>
                                </button>
                                <button className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                                <button className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add Another */}
                    <button className="w-full rounded-[40px] border-2 border-dashed border-outline-variant/50 p-10 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all group">
                        <div className="w-10 h-10 rounded-full border-2 border-on-surface group-hover:border-primary group-hover:text-primary transition-colors flex items-center justify-center text-on-surface">
                            <span className="material-symbols-outlined font-bold">add</span>
                        </div>
                        <span className="font-label-md font-bold text-on-surface group-hover:text-primary transition-colors">
                            Add another Aloe to the group
                        </span>
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-outline-variant/30 bg-surface mt-20 py-12">
                <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-8 px-6">
                    <div className="flex items-center group">
                        <span className="material-symbols-outlined text-on-surface text-3xl mr-2">eco</span>
                        <span className="font-bold text-xl text-on-surface">FloraCare</span>
                    </div>
                    <div className="flex items-center gap-8 font-label-md text-on-surface-variant">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Help & Support</a>
                    </div>
                    <p className="font-body-sm text-on-surface-variant/60 text-[13px]">
                        © 2024 FloraCare. Cultivating tranquility, one leaf at a time.
                    </p>
                </div>
            </footer>
        </div>
    );
}
