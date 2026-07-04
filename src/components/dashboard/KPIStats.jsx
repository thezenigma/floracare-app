import React from 'react';

export default function KPIStats({ totalPlants, criticalAlerts, journalStreak = 15 }) {
    return (
        <div className="grid grid-cols-3 gap-3 md:gap-8 mb-4 w-full">
            <div className="bg-surface rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500 flex flex-col items-center md:items-start text-center md:text-left" style={{ animationDelay: '100ms' }}>
                <span className="font-label-md text-[10px] md:text-[14px] text-on-surface-variant flex flex-col md:flex-row items-center gap-1 md:gap-2 mb-2 md:mb-4 font-medium">
                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">local_florist</span> <span className="hidden md:inline">Total Plants</span><span className="md:hidden">Plants</span>
                </span>
                <span className="font-display-lg text-[28px] md:text-[48px] text-on-surface font-semibold tracking-tight">{totalPlants}</span>
            </div>
            
            <div className="bg-surface rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500 flex flex-col items-center md:items-start text-center md:text-left" style={{ animationDelay: '200ms' }}>
                <span className="font-label-md text-[10px] md:text-[14px] text-error flex flex-col md:flex-row items-center gap-1 md:gap-2 mb-2 md:mb-4 font-medium">
                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">warning</span> <span className="hidden md:inline">Critical Alerts</span><span className="md:hidden">Alerts</span>
                </span>
                <span className="font-display-lg text-[28px] md:text-[48px] text-error font-semibold tracking-tight">{criticalAlerts}</span>
            </div>

            <div className="bg-surface rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500 flex flex-col items-center md:items-start text-center md:text-left" style={{ animationDelay: '300ms' }}>
                <span className="font-label-md text-[10px] md:text-[14px] text-on-surface-variant flex flex-col md:flex-row items-center gap-1 md:gap-2 mb-2 md:mb-4 font-medium">
                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">playlist_add_check</span> <span className="hidden md:inline">Journal Streak</span><span className="md:hidden">Streak</span>
                </span>
                <span className="font-display-lg text-[28px] md:text-[48px] text-on-surface font-semibold tracking-tight leading-none md:leading-tight">
                    {journalStreak} <span className="text-[12px] md:text-[48px]">Days</span>
                </span>
            </div>
        </div>
    );
}
