import React from 'react';
import PlantCard from './PlantCard';

export default function PlantRoster({ plants }) {
    return (
        <div className="bg-surface rounded-[2rem] p-10 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-headline-sm text-on-surface flex items-center gap-3 font-semibold text-[18px]">
                    <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: '"FILL" 1' }}>psychiatry</span>
                    Plant Roster
                </h3>
                <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 hover-interactive">
                    <span className="font-label-md text-[14px]">Export Data</span>
                    <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {plants.map((plant, index) => (
                    <PlantCard key={index} {...plant} />
                ))}
            </div>
        </div>
    );
}
