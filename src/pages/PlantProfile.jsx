import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PlantProfile() {
    const { id } = useParams();
    
    // Hardcoded to Monty for this view based on design
    return (
        <div className="flex flex-col gap-6 relative h-full w-full pb-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm">
                <Link to="/dashboard" className="hover:text-primary transition-colors">Garden</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span>Monty</span>
            </div>

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div className="flex items-baseline gap-3">
                    <h1 className="text-[42px] font-bold text-primary leading-none tracking-tight">Monty</h1>
                    <span className="text-[18px] italic text-on-surface-variant font-body-lg">Monstera Deliciosa</span>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface font-label-md">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        Edit Profile
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container hover:opacity-90 transition-opacity text-on-primary-container font-label-md font-bold">
                        <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                        Log Care Task
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column - Image */}
                <div className="lg:col-span-4 lg:col-start-1">
                    <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-sm aspect-[3/4]">
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSZBryTK6AXJ2uyXkng9faY9klcWEMNGCj-CvkQRex5OpFTd_Y9drqIpqB0nOTFJYf3DIokEW1fgKFFoyp9PKf3c1ndXaVcewG3z7Q-WnOLMW3VS8WxhJQHMuPXcxOR4vJcZOGUXBAvfjusHg-8AIkntsvxdXOwDOkrmNscF5KrQREzfGP0PPdlzGdRvWEQS70WUOkT0XfYSdig6Zuf8NfH5tWYa8yrGtUomLWjzyFKMCEtaLER2VNSyDYZHb80qNHjgu5x1Sug_I" 
                            alt="Monty"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                    </div>
                </div>

                {/* Right Column - Stats & Schedule */}
                <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-6">
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Stat Card 1 */}
                        <div className="bg-surface-container border border-outline-variant/20 rounded-3xl p-6 flex flex-col items-start gap-4">
                            <span className="material-symbols-outlined text-[24px] text-on-surface-variant">water_drop</span>
                            <div>
                                <p className="font-label-sm text-on-surface-variant text-[12px] mb-1">Last Watered</p>
                                <p className="font-title-md text-on-surface font-bold text-[16px]">3 days ago</p>
                            </div>
                        </div>
                        {/* Stat Card 2 */}
                        <div className="bg-surface-container border border-outline-variant/20 rounded-3xl p-6 flex flex-col items-start gap-4">
                            <span className="material-symbols-outlined text-[24px] text-on-surface-variant">eco</span>
                            <div>
                                <p className="font-label-sm text-on-surface-variant text-[12px] mb-1">Next Fertilizer</p>
                                <p className="font-title-md text-on-surface font-bold text-[16px]">In 10 days</p>
                            </div>
                        </div>
                        {/* Stat Card 3 */}
                        <div className="bg-surface-container border border-outline-variant/20 rounded-3xl p-6 flex flex-col items-start gap-4">
                            <span className="material-symbols-outlined text-[24px] text-on-surface-variant">light_mode</span>
                            <div>
                                <p className="font-label-sm text-on-surface-variant text-[12px] mb-1">Light Level</p>
                                <p className="font-title-md text-on-surface font-bold text-[16px]">Bright Indirect</p>
                            </div>
                        </div>
                    </div>

                    {/* Care Schedule */}
                    <div className="bg-surface-container border border-outline-variant/10 rounded-[32px] p-8 flex flex-col gap-6 w-full">
                        <h2 className="font-title-lg text-[22px] text-on-surface">Care Schedule</h2>
                        
                        <div className="flex flex-col gap-4">
                            {/* Task 1 - Active */}
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-high border border-primary/30 shadow-[0_0_15px_rgba(var(--color-primary),0.15)] relative overflow-hidden group cursor-pointer transition-all hover:border-primary/50">
                                <div className="absolute inset-0 bg-primary/5 opacity-50"></div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                                        <span className="material-symbols-outlined text-on-primary-container">water_drop</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-lg text-on-surface font-bold text-[15px]">Watering Required</span>
                                        <span className="font-body-sm text-on-surface-variant text-[13px]">Due today • 500ml filtered water</span>
                                    </div>
                                </div>
                                <div className="relative z-10 w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant group-hover:border-primary group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[16px]">check</span>
                                </div>
                            </div>

                            {/* Task 2 */}
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-outline-variant/20 group cursor-pointer hover:bg-surface-container-high transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                                        <span className="material-symbols-outlined text-on-surface-variant">mist</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-lg text-on-surface font-bold text-[15px]">Misting</span>
                                        <span className="font-body-sm text-on-surface-variant text-[13px]">Scheduled for Tomorrow morning</span>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant/50 group-hover:border-outline-variant group-hover:text-on-surface-variant transition-colors">
                                    <span className="material-symbols-outlined text-[16px]">check</span>
                                </div>
                            </div>

                            {/* Task 3 */}
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-outline-variant/20 group cursor-pointer hover:bg-surface-container-high transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                                        <span className="material-symbols-outlined text-on-surface-variant">search</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-lg text-on-surface font-bold text-[15px]">Soil Check</span>
                                        <span className="font-body-sm text-on-surface-variant text-[13px]">Scheduled for May 28</span>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant/50 group-hover:border-outline-variant group-hover:text-on-surface-variant transition-colors">
                                    <span className="material-symbols-outlined text-[16px]">check</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
