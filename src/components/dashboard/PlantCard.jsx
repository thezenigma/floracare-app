import React from 'react';
import { Link } from 'react-router-dom';

export default function PlantCard({ name, species, image, status, tags }) {
    const statusColor = status === 'alert' ? 'bg-error' : (status === 'collection' ? 'bg-transparent' : 'bg-primary');
    const path = status === 'collection' ? '/collection' : `/plant/${name.toLowerCase().replace(/ /g, '-')}`;
    
    return (
        <Link to={path} className="bg-surface rounded-[1.5rem] p-4 flex gap-6 items-center group border border-outline-variant/30 relative overflow-hidden transition-all transition-colors duration-500 hover:-translate-y-1 hover:shadow-md cursor-pointer">
            <div className={`absolute inset-y-4 left-0 w-1.5 rounded-r-full transition-colors duration-500 ${statusColor}`}></div>
            
            <div className="relative w-32 h-32 ml-2 shrink-0 rounded-2xl overflow-hidden bg-surface-container-low flex items-center justify-center transition-colors duration-500">
                {status === 'collection' ? (
                    <div className="w-full h-full bg-surface-container-highest flex items-center justify-center border border-outline-variant/30 rounded-2xl transition-colors duration-500">
                        <span className="material-symbols-outlined text-on-surface text-[32px]">folder</span>
                    </div>
                ) : (
                    <img alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={image} />
                )}
            </div>
            
            <div className="flex flex-col gap-2 flex-1 py-2 pr-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-headline-sm text-on-surface text-[18px] font-semibold">{name}</h4>
                        <p className="text-label-sm text-on-surface-variant font-medium text-[12px] mt-0.5">{species}</p>
                    </div>
                    {status === 'collection' && (
                        <span className="px-3 py-1 rounded-full bg-transparent text-on-surface-variant border border-outline-variant font-label-md text-[12px]">Group</span>
                    )}
                </div>
                
                <div className="mt-2 flex flex-col gap-2 items-start">
                    {tags.map((tag, i) => (
                        <span key={i} className={`px-3 py-1 rounded-full text-[12px] font-medium flex items-center gap-1.5 ${
                            tag.type === 'error' ? 'bg-error-container text-error' : 
                            'bg-surface-container-highest text-on-surface-variant'
                        }`}>
                            {tag.icon && <span className="material-symbols-outlined text-[14px]">{tag.icon}</span>}
                            {tag.label}
                        </span>
                    ))}
                    {status === 'collection' && (
                        <div className="w-full flex justify-end mt-2">
                            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
