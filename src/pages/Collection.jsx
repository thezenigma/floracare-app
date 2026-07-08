import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddPlantModal from '../components/dashboard/AddPlantModal';
import { useTheme } from '../context/ThemeContext';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Collection() {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Local state to manage hardcoded collection plants visibility
    const [collectionPlants, setCollectionPlants] = useState([
        { id: 'aloe1', visible: true },
        { id: 'aloe2', visible: true }
    ]);

    const handleDelete = (id) => {
        setCollectionPlants(prev => prev.map(p => p.id === id ? { ...p, visible: false } : p));
    };

    const activeCount = collectionPlants.filter(p => p.visible).length;

    return (
        <div className="flex flex-col font-body-md transition-colors duration-500 w-full h-full pb-10">
            <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-12">


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
                            {activeCount} Plants Active
                        </div>
                    </div>
                </ScrollReveal>

                <div className="flex flex-col gap-6">
                    {/* Plant 1 */}
                    {collectionPlants.find(p => p.id === 'aloe1')?.visible && (
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
                                    <div className="flex flex-col justify-center md:border-l border-outline-variant/30 md:pl-6 h-full min-h-[60px]">
                                        <p className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mb-1">Last Watered</p>
                                        <p className="font-body-lg text-[18px] text-on-surface font-semibold">3 Days Ago</p>
                                    </div>
                                    <div className="flex items-center justify-start md:justify-end gap-2 mt-2 md:mt-0">
                                        <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm" title="Watering"><span className="material-symbols-outlined text-[20px]">water_drop</span></button>
                                        <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm" title="Fertilizer"><span className="material-symbols-outlined text-[20px]">potted_plant</span></button>
                                        <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm" title="Pruning"><span className="material-symbols-outlined text-[20px]">content_cut</span></button>
                                        <button onClick={(e) => { e.stopPropagation(); handleDelete('aloe1'); }} className="p-2.5 w-10 h-10 flex items-center justify-center bg-error/10 text-error rounded-full hover:bg-error hover:text-white transition-all shadow-sm ml-1" title="Delete"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* Plant 2 */}
                    {collectionPlants.find(p => p.id === 'aloe2')?.visible && (
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
                                    <div className="flex flex-col justify-center md:border-l border-outline-variant/30 md:pl-6 h-full min-h-[60px]">
                                        <p className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest mb-1">Last Watered</p>
                                        <p className="font-body-lg text-[18px] text-[#B27D56] font-semibold">9 Days Ago</p>
                                    </div>
                                    <div className="flex items-center justify-start md:justify-end gap-2 mt-2 md:mt-0">
                                        <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-[#B27D56] text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-md" title="Watering"><span className="material-symbols-outlined text-[20px]">water_drop</span></button>
                                        <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm" title="Fertilizer"><span className="material-symbols-outlined text-[20px]">potted_plant</span></button>
                                        <button onClick={(e) => e.stopPropagation()} className="p-2.5 w-10 h-10 flex items-center justify-center bg-surface-container-highest text-on-surface rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all shadow-sm" title="Pruning"><span className="material-symbols-outlined text-[20px]">content_cut</span></button>
                                        <button onClick={(e) => { e.stopPropagation(); handleDelete('aloe2'); }} className="p-2.5 w-10 h-10 flex items-center justify-center bg-error/10 text-error rounded-full hover:bg-error hover:text-white transition-all shadow-sm ml-1" title="Delete"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

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

            {/* Modals */}
            <AddPlantModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </div>
    );
}
