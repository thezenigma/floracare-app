import React, { useState } from 'react';
import PlantCard from './PlantCard';
import AddPlantModal from './AddPlantModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlantRoster({ plants }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-surface rounded-[2rem] p-6 md:p-10 shadow-sm border border-outline-variant/30 animate-stagger transition-colors duration-500" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-headline-sm text-on-surface flex items-center gap-3 font-semibold text-[18px]">
                    <span className="material-symbols-outlined text-primary text-[24px] md:text-[28px]" style={{ fontVariationSettings: '"FILL" 1' }}>local_florist</span>
                    Plant Roster
                </h3>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md text-[14px] flex items-center gap-2 hover:opacity-90 shadow-sm transition-all hover:-translate-y-0.5"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Add Plant
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative min-h-[200px]">
                <AnimatePresence mode="popLayout">
                    {plants.map((plant) => (
                        <motion.div
                            key={plant.id}
                            layout
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <PlantCard {...plant} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {plants.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-on-surface-variant opacity-50"
                    >
                        <span className="material-symbols-outlined text-[48px] font-light">potted_plant</span>
                        <p className="font-body-md text-center">No plants match your filters.</p>
                    </motion.div>
                )}
            </div>
            
            <AddPlantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
