import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlantContext } from '../../context/PlantContext';

const LOCATIONS = [
    { id: 'living-room', label: 'Living Room', icon: 'weekend' },
    { id: 'bedroom', label: 'Bedroom', icon: 'bed' },
    { id: 'office', label: 'Office', icon: 'desktop_windows' },
    { id: 'other', label: 'Other', icon: 'more_horiz' }
];

export default function AddPlantModal({ isOpen, onClose }) {
    const [selectedLocation, setSelectedLocation] = useState('living-room');
    const [plantName, setPlantName] = useState('');
    const [species, setSpecies] = useState('');
    const { addPlant } = usePlantContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!plantName.trim()) return;

        const newPlant = {
            id: `plant-${Date.now()}`,
            name: plantName,
            species: species || 'Unknown Species',
            location: LOCATIONS.find(l => l.id === selectedLocation)?.label || 'Other',
            image: "https://images.unsplash.com/photo-1598531405908-410048cd3c5f?q=80&w=600&auto=format&fit=crop",
            status: "optimal",
            tags: [
                { label: "Newly Added", icon: "fiber_new", type: "neutral" }
            ]
        };

        addPlant(newPlant);
        
        // Reset state
        setPlantName('');
        setSpecies('');
        setSelectedLocation('living-room');
        
        onClose();
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-xl shadow-2xl border border-outline-variant flex flex-col md:flex-row bg-surface-container-low z-10"
                    >
                        <button 
                            className="absolute top-6 right-6 z-20 p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant" 
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {/* Form Section */}
                        <div className="flex-1 px-6 md:px-10 pt-8 md:pt-10 pb-6 md:pb-8 flex flex-col gap-6">
                            <div className="flex flex-col gap-1.5">
                                <h2 className="text-2xl md:text-3xl font-semibold text-primary">New Companion</h2>
                                <p className="text-on-surface-variant max-w-md text-sm">Let's integrate a new member into your digital garden. Provide some details to get started with precision care.</p>
                            </div>
                            
                            <form className="flex flex-col gap-5 flex-1" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-on-surface ml-1">Plant Name</label>
                                        <input 
                                            className="w-full border rounded-full py-2.5 px-5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-surface-container-highest border-outline-variant" 
                                            placeholder="e.g. Oliver the Pilea" 
                                            type="text"
                                            value={plantName}
                                            onChange={(e) => setPlantName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 relative">
                                        <label className="text-sm font-medium text-on-surface ml-1">Species</label>
                                        <div className="relative">
                                            <input
                                                className="w-full border rounded-full py-2.5 px-5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-12 bg-surface-container-highest border-outline-variant" 
                                                placeholder="Search species..." 
                                                type="text"
                                                value={species}
                                                onChange={(e) => setSpecies(e.target.value)}
                                            />
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-on-surface ml-1">Growth Location</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {LOCATIONS.map((loc) => {
                                            const isSelected = selectedLocation === loc.id;
                                            return (
                                                <button 
                                                    key={loc.id}
                                                    onClick={() => setSelectedLocation(loc.id)}
                                                    className="relative flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl group" 
                                                    type="button"
                                                >
                                                    {isSelected && (
                                                        <motion.div 
                                                            layoutId="location-highlight"
                                                            className="absolute inset-0 bg-primary-container/20 border border-primary/40 rounded-xl"
                                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                        />
                                                    )}
                                                    {!isSelected && (
                                                        <div className="absolute inset-0 border border-outline-variant rounded-xl bg-surface-container-low group-hover:border-primary/40 transition-colors duration-300" />
                                                    )}
                                                    <span className={`material-symbols-outlined relative z-10 transition-colors duration-300 text-[20px] ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                                                        {loc.icon}
                                                    </span>
                                                    <span className="text-[13px] font-medium relative z-10 text-on-surface">
                                                        {loc.label}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-on-surface ml-1">Documentation</label>
                                    <div className="w-full h-24 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low flex flex-col items-center justify-center gap-1.5 hover:border-primary/50 transition-all cursor-pointer">
                                        <span className="material-symbols-outlined text-primary text-[28px]">add_a_photo</span>
                                        <div className="text-center">
                                            <p className="text-[13px] font-medium text-on-surface">Click to upload or drag and drop</p>
                                            <p className="text-[11px] text-on-surface-variant mt-0.5">PNG, JPG, or HEIC (max. 10MB)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2 mt-auto">
                                    <button 
                                        className="px-6 py-2.5 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors" 
                                        onClick={onClose} 
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="px-6 py-2.5 text-sm font-medium bg-primary text-on-primary rounded-full shadow-md hover:opacity-90 transition-all" 
                                        type="submit"
                                    >
                                        Integrate Plant
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar / Image Preview Section */}
                        <div className="w-full md:w-80 bg-surface-container-high px-6 md:px-10 pt-8 md:pt-10 pb-6 md:pb-8 flex flex-col gap-6 border-t md:border-t-0 md:border-l border-outline-variant">
                            <div className="relative w-full aspect-video md:aspect-square rounded-xl overflow-hidden border border-outline-variant shadow-sm max-h-[160px] md:max-h-[220px]">
                                <img alt="Plant preview" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1598531405908-410048cd3c5f?q=80&w=600&auto=format&fit=crop" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                                    <div className="flex flex-col">
                                        <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full w-fit text-[9px] font-bold uppercase tracking-wider mb-1.5">Live Preview</span>
                                        <h3 className="text-base font-semibold text-white">Pilea Peperomioides</h3>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-3">
                                <h4 className="text-xs font-medium text-on-surface uppercase tracking-widest opacity-60">Ideal Conditions</h4>
                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-[18px]">wb_sunny</span>
                                        <p className="text-sm text-on-surface-variant">Bright, indirect sunlight</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-[18px]">opacity</span>
                                        <p className="text-sm text-on-surface-variant">Water every 7-10 days</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-[18px]">thermostat</span>
                                        <p className="text-sm text-on-surface-variant">65°F - 75°F (18°C - 24°C)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
