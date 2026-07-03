import React from 'react';

export default function KPIStats({ totalPlants, criticalAlerts, journalStreak = 15 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4 w-full">
            <div className="bg-surface rounded-[2rem] p-8 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500" style={{ animationDelay: '100ms' }}>
                <span className="font-label-md text-[14px] text-on-surface-variant flex items-center gap-2 mb-4 font-medium">
                    <span className="material-symbols-outlined text-[18px]">local_florist</span> Total Plants
                </span>
                <span className="font-display-lg text-[48px] text-on-surface font-semibold tracking-tight">{totalPlants}</span>
            </div>
            
            <div className="bg-surface rounded-[2rem] p-8 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500" style={{ animationDelay: '200ms' }}>
                <span className="font-label-md text-[14px] text-error flex items-center gap-2 mb-4 font-medium">
                    <span className="material-symbols-outlined text-[18px]">warning</span> Critical Alerts
                </span>
                <span className="font-display-lg text-[48px] text-error font-semibold tracking-tight">{criticalAlerts}</span>
            </div>

            <div className="bg-surface rounded-[2rem] p-8 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500" style={{ animationDelay: '300ms' }}>
                <span className="font-label-md text-[14px] text-on-surface-variant flex items-center gap-2 mb-4 font-medium">
                    <span className="material-symbols-outlined text-[18px]">playlist_add_check</span> Journal Streak
                </span>
                <span className="font-display-lg text-[48px] text-on-surface font-semibold tracking-tight">{journalStreak} Days</span>
            </div>
        </div>
    );
}
