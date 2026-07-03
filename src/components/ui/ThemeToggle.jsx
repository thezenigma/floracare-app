import React from 'react';

export default function ThemeToggle({ isDark, toggleTheme }) {
    return (
        <div className="flex items-center gap-3 px-4 py-2 glass-panel rounded-full border border-primary/5">
            <span className="material-symbols-outlined text-on-background text-[20px] opacity-60">light_mode</span>
            <label className="relative inline-block w-[44px] h-[24px]">
                <input 
                    type="checkbox" 
                    className="opacity-0 w-0 h-0" 
                    checked={isDark}
                    onChange={toggleTheme}
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-surface-container-highest transition-all duration-400 rounded-[34px] before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[3px] before:bottom-[3px] before:bg-primary before:transition-all before:duration-400 before:rounded-full ${isDark ? 'before:translate-x-[20px]' : ''}`}></span>
            </label>
            <span className="material-symbols-outlined text-on-background text-[20px] opacity-60">dark_mode</span>
        </div>
    );
}
