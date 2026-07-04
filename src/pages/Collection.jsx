import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddPlantModal from '../components/dashboard/AddPlantModal';
import { useTheme } from '../context/ThemeContext';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Collection() {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md transition-colors duration-500">
            {/* Header */}
            <header className="w-full px-8 py-4 border-b border-outline-variant/30 bg-surface">
                <div className="max-w-[1280px] mx-auto flex justify-between items-center w-full">
                    <Link to="/dashboard" className="flex items-center group cursor-pointer">
                        <span className="material-symbols-outlined text-primary text-3xl mr-2">eco</span>
                        <span className="font-bold text-xl text-primary">FloraCare</span>
                    </Link>
                    
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

                <ScrollReveal direction="down">
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
                </ScrollReveal>

                <div className="flex flex-col gap-6">
                    {/* Plant 1 */}
                    <ScrollReveal direction="up" delay={0.1}>
                        <div className="bg-surface p-6 rounded-lg flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-all duration-500 group relative overflow-hidden border border-outline-variant/30 cursor-pointer" onClick={() => navigate('/plant/aloe1')}>
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-outline-variant/20 shadow-inner">
                                <img alt="Aloe Vera 1 close up" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1596547609652-9fc5b8cb007c?q=80&w=400&auto=format&fit=crop" />
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10 items-center">
                                <div>
                                    <h3 className="font-headline-md text-[24px] font-semibold text-on-surface mb-1">Aloe Vera 1</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                                        <span className="font-label-md text-[14px] text-on-surface-variant font-medium">Health: Optimal</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center border-l border-outline-variant/30 pl-6 h-full min-h-[60px]">
                                    <p className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mb-1">Last Watered</p>
                                    <p className="font-body-lg text-[18px] text-on-surface font-semibold">3 Days Ago</p>
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm" title="Watering"><span className="material-symbols-outlined text-[20px]">water_drop</span></button>
                                    <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm" title="Fertilizer"><span className="material-symbols-outlined text-[20px]">potted_plant</span></button>
                                    <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm" title="Pruning"><span className="material-symbols-outlined text-[20px]">content_cut</span></button>
                                    <button className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Plant 2 */}
                    <ScrollReveal direction="up" delay={0.2}>
                        <div className="bg-surface p-6 rounded-lg flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-all duration-500 group relative overflow-hidden border border-outline-variant/30 cursor-pointer" onClick={() => navigate('/plant/aloe2')}>
                            <div className="absolute inset-0 bg-[#B27D56]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-outline-variant/20 shadow-inner">
                                <img alt="Aloe Vera 2 small plant" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1577770857321-7f938d87b322?q=80&w=400&auto=format&fit=crop" />
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10 items-center">
                                <div>
                                    <h3 className="font-headline-md text-[24px] font-semibold text-on-surface mb-1">Aloe Vera 2</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#B27D56]"></span>
                                        <span className="font-label-md text-[14px] text-on-surface-variant font-medium">Health: Thirsty</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center border-l border-outline-variant/30 pl-6 h-full min-h-[60px]">
                                    <p className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mb-1">Last Watered</p>
                                    <p className="font-body-lg text-[18px] text-[#B27D56] font-semibold">9 Days Ago</p>
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-[#B27D56] text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-md" title="Watering"><span className="material-symbols-outlined text-[20px]">water_drop</span></button>
                                    <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm" title="Fertilizer"><span className="material-symbols-outlined text-[20px]">potted_plant</span></button>
                                    <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm" title="Pruning"><span className="material-symbols-outlined text-[20px]">content_cut</span></button>
                                    <button className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Add Another CTA */}
                    <ScrollReveal direction="up" delay={0.3}>
                        <div 
                            onClick={() => setIsAddModalOpen(true)}
                            className="border-2 border-dashed border-primary/30 p-8 rounded-lg flex flex-col items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary/60 transition-all cursor-pointer group"
                        >
                            <span className="material-symbols-outlined text-[36px] text-primary group-hover:scale-110 transition-transform">add_circle</span>
                            <p className="font-label-md text-[14px] text-primary font-semibold">Add another Aloe to the group</p>
                        </div>
                    </ScrollReveal>
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
            
            {/* Modals */}
            <AddPlantModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </div>
    );
}
