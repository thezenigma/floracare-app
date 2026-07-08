import React from 'react';
import { Link } from 'react-router-dom';
import { usePlantContext } from '../../context/PlantContext';

export default function PlantCard({ id, name, species, image, status, tags }) {
    const { removePlant } = usePlantContext();
    const isAlert = status === 'alert';
    const isCollection = status === 'collection';
    const statusColor = isAlert ? 'bg-error' : (isCollection ? 'bg-tertiary' : 'bg-primary');
    const hoverBorder = isAlert ? 'hover:border-error/30' : (isCollection ? 'hover:border-tertiary/30' : 'hover:border-primary/30');
    const path = isCollection ? '/collection' : `/plant/${name.toLowerCase().replace(/ /g, '-')}`;
    
    return (
        <Link to={path} className={`bg-surface-container-lowest rounded-xl p-4 flex gap-6 items-center group border border-outline-variant/20 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${hoverBorder} cursor-pointer`}>
            <div className={`absolute inset-y-0 left-0 w-1.5 transition-colors duration-500 ${statusColor}`}></div>
            
            {isCollection ? (
                <div className="relative w-24 h-24 md:w-32 md:h-32 ml-2 shrink-0">
                    <div className="absolute inset-0 bg-surface-container-highest rounded-lg translate-x-2 -translate-y-2 border border-outline-variant/30"></div>
                    <div className="absolute inset-0 bg-surface-container-high rounded-lg translate-x-1 -translate-y-1 border border-outline-variant/30"></div>
                    <div className="relative w-full h-full rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-container-low flex items-center justify-center shadow-inner transition-colors duration-500">
                        <span className="material-symbols-outlined text-tertiary text-[40px] md:text-[48px]">folder</span>
                    </div>
                </div>
            ) : (
                <div className="relative w-24 h-24 md:w-32 md:h-32 ml-2 shrink-0 rounded-lg overflow-hidden border border-outline-variant/20 shadow-inner transition-colors duration-500">
                    <img alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={image} />
                </div>
            )}
            
            <div className="flex flex-col gap-1 flex-1 py-1 pr-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-headline-sm text-on-surface text-[20px] font-semibold">{name}</h4>
                        <p className="text-label-sm text-on-surface-variant text-[13px] mt-0.5">{species}</p>
                    </div>
                    {isCollection && (
                        <span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-md border border-tertiary/20 text-[12px]">Group</span>
                    )}
                </div>
                
                {isCollection ? (
                    <div className="w-full flex justify-end mt-4">
                        <span className="material-symbols-outlined text-on-surface-variant text-[24px] group-hover:text-primary transition-colors">arrow_forward</span>
                    </div>
                ) : (
                    <div className="mt-4 flex items-center gap-2">
                        <button onClick={(e) => e.preventDefault()} className="w-10 h-10 shrink-0 rounded-full bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300 hover:scale-105" title="Watering">
                            <span className="material-symbols-outlined text-[20px]">water_drop</span>
                        </button>
                        <button onClick={(e) => e.preventDefault()} className="w-10 h-10 shrink-0 rounded-full bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300 hover:scale-105" title="Fertilizing">
                            <span className="material-symbols-outlined text-[20px]">yard</span>
                        </button>
                        <button onClick={(e) => e.preventDefault()} className="w-10 h-10 shrink-0 rounded-full bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300 hover:scale-105" title="Pruning">
                            <span className="material-symbols-outlined text-[20px]">content_cut</span>
                        </button>
                        <div className="flex-1"></div>
                        <button onClick={(e) => { e.preventDefault(); removePlant(id); }} className="w-10 h-10 shrink-0 rounded-full bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all duration-300 hover:scale-105" title="Delete">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
}
