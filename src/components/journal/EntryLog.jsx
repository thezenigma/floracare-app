import React from 'react';

export default function EntryLog({ entry, index, onDelete }) {
    const delay = `${(index + 2) * 100}ms`;

    if (entry.isUrgent) {
        return (
            <article className="animate-stagger bg-surface rounded-2xl p-6 shadow-sm border-l-[6px] border-error transition-all duration-500 hover:-translate-y-1 hover:shadow-md cursor-pointer relative" style={{ animationDelay: delay }}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-label-md text-[16px] text-error font-bold">{entry.plantName}</h3>
                        <p className="font-label-sm text-[12px] text-on-surface-variant flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-[14px]">warning</span> {entry.time}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-4 py-1 rounded-full bg-error/20 text-error font-label-sm text-[12px] font-medium">{entry.category}</span>
                        {onDelete && (
                            <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-on-surface-variant hover:text-error transition-colors p-1" title="Delete entry">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                        )}
                    </div>
                </div>
                <p className="font-body-md text-[16px] text-on-surface leading-relaxed mb-4">
                    {entry.content}
                </p>
                {entry.image && (
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm">
                        <img className="w-full h-full object-cover" src={entry.image} alt={entry.plantName} />
                    </div>
                )}
            </article>
        );
    }

    return (
        <article className="animate-stagger bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-md cursor-pointer relative" style={{ animationDelay: delay }}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-label-md text-[16px] text-primary font-bold">
                        {entry.plantName} <span className="font-normal text-on-surface-variant ml-1">({entry.species})</span>
                    </h3>
                    <p className="font-label-sm text-[12px] text-on-surface-variant flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span> {entry.time}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-4 py-1 rounded-full font-label-sm text-[12px] font-medium ${entry.category === 'Growth' ? 'bg-primary/20 text-primary' : 'bg-secondary-container text-on-secondary-container'}`}>
                        {entry.category}
                    </span>
                    {onDelete && (
                        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-on-surface-variant hover:text-error transition-colors p-1" title="Delete entry">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                    )}
                </div>
            </div>
            <p className="font-body-md text-[16px] text-on-surface mb-4 leading-relaxed">
                {entry.content}
            </p>
            {entry.image && (
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm">
                    <img className="w-full h-full object-cover" src={entry.image} alt={entry.plantName} />
                </div>
            )}
        </article>
    );
}
