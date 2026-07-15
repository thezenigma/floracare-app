import React, { useState, useEffect } from 'react';

function AnimatedNumber({ value, duration = 1500 }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const targetValue = parseInt(value, 10);
        if (isNaN(targetValue)) {
            setDisplayValue(value);
            return;
        }

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // easeOutQuart easing function
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            setDisplayValue(Math.floor(easeProgress * targetValue));
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setDisplayValue(targetValue);
            }
        };
        
        window.requestAnimationFrame(step);
    }, [value, duration]);

    return <>{displayValue}</>;
}

export default function KPIStats({ totalPlants, criticalAlerts, journalStreak = 15 }) {
    return (
        <div className="grid grid-cols-3 gap-3 md:gap-8 mb-4 w-full">
            <div className="bg-surface rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500 flex flex-col items-center md:items-start text-center md:text-left" style={{ animationDelay: '100ms' }}>
                <span className="font-label-md text-[10px] md:text-[14px] text-on-surface-variant flex flex-col md:flex-row items-center gap-1 md:gap-2 mb-2 md:mb-4 font-medium">
                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">local_florist</span> <span className="hidden md:inline">Total Plants</span><span className="md:hidden">Plants</span>
                </span>
                <span className="font-display-lg text-[28px] md:text-[48px] text-on-surface font-semibold tracking-tight">
                    <AnimatedNumber value={totalPlants} />
                </span>
            </div>
            
            <div className="bg-surface rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500 flex flex-col items-center md:items-start text-center md:text-left" style={{ animationDelay: '200ms' }}>
                <span className="font-label-md text-[10px] md:text-[14px] text-error flex flex-col md:flex-row items-center gap-1 md:gap-2 mb-2 md:mb-4 font-medium">
                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">warning</span> <span className="hidden md:inline">Critical Alerts</span><span className="md:hidden">Alerts</span>
                </span>
                <span className="font-display-lg text-[28px] md:text-[48px] text-error font-semibold tracking-tight">
                    <AnimatedNumber value={criticalAlerts} />
                </span>
            </div>

            <div className="bg-surface rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500 flex flex-col items-center md:items-start text-center md:text-left" style={{ animationDelay: '300ms' }}>
                <span className="font-label-md text-[10px] md:text-[14px] text-on-surface-variant flex flex-col md:flex-row items-center gap-1 md:gap-2 mb-2 md:mb-4 font-medium">
                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">playlist_add_check</span> <span className="hidden md:inline">Journal Streak</span><span className="md:hidden">Streak</span>
                </span>
                <span className="font-display-lg text-[28px] md:text-[48px] text-on-surface font-semibold tracking-tight leading-none md:leading-tight">
                    <AnimatedNumber value={journalStreak} /> <span className="text-[12px] md:text-[48px]">Days</span>
                </span>
            </div>
        </div>
    );
}
