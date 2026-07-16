import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlantContext } from '../../context/PlantContext';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const LOCATIONS = [
    { id: 'living-room', label: 'Living Room', icon: 'weekend' },
    { id: 'bedroom', label: 'Bedroom', icon: 'bed' },
    { id: 'office', label: 'Office', icon: 'desktop_windows' },
    { id: 'other', label: 'Other', icon: 'more_horiz' }
];

export default function AddPlantModal({ isOpen, onClose }) {
    const { user } = useAuth();
    const [selectedLocation, setSelectedLocation] = useState('living-room');
    const [plantName, setPlantName] = useState('');
    const [species, setSpecies] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [careData, setCareData] = useState(null);
    const [speciesError, setSpeciesError] = useState('');
    
    const fileInputRef = useRef(null);
    const { addPlant } = usePlantContext();

    const handleSearch = async () => {
        if (!species.trim()) return;
        setIsSearching(true);
        setCareData(null);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 
                           (import.meta.env.VITE_WS_URL ? import.meta.env.VITE_WS_URL.replace('ws', 'http').replace('/ws/chat', '') : 'http://localhost:8000');
            
            const response = await fetch(`${apiUrl}/api/plants/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: species })
            });
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Server returned ${response.status}: ${text}`);
            }
            const data = await response.json();
            if (data.care_data) {
                setSpecies(data.species); // Update to formal name
                setCareData(data.care_data);
                setSpeciesError('');
            } else if (data.species) {
                setSpecies(data.species); // Still update name if found but no data
                setSpeciesError("Plant found but no care profile available.");
            } else {
                setSpeciesError("Species not recognized. Try a different name.");
            }
        } catch (error) {
            console.error("Error searching plant:", error);
            setSpeciesError("Search failed. Please check your connection.");
        } finally {
            setIsSearching(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const availableSlots = 4 - imageFiles.length;
        const filesToAdd = files.slice(0, availableSlots);
        
        if (filesToAdd.length > 0) {
            setImageFiles(prev => [...prev, ...filesToAdd]);
            const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
        
        // Reset input value so same file can be selected again if removed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    
    const removeImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!plantName.trim() || isUploading) return;
        
        if (imageFiles.length === 0) {
            setSpeciesError("At least one picture of the plant is required.");
            return;
        }

        setIsUploading(true);
        let finalImageUrl = null;
        let additionalImageUrls = [];

        if (imageFiles.length > 0 && user) {
            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const fileExt = file.name.split('.').pop();
                const fileName = `${user.id}/${Date.now()}_${i}.${fileExt}`;
                
                const { data, error } = await supabase.storage
                    .from('plant_images')
                    .upload(fileName, file);
                    
                if (error) {
                    console.error("Error uploading image:", error);
                } else if (data) {
                    const { data: publicUrlData } = supabase.storage
                        .from('plant_images')
                        .getPublicUrl(fileName);
                    
                    if (i === 0) {
                        finalImageUrl = publicUrlData.publicUrl;
                    } else {
                        additionalImageUrls.push(publicUrlData.publicUrl);
                    }
                }
            }
        }

        const newPlant = {
            name: plantName,
            species: species || 'Unknown Species',
            location: LOCATIONS.find(l => l.id === selectedLocation)?.label || 'Other',
            image_url: finalImageUrl,
            additional_image_urls: additionalImageUrls,
            health_status: "optimal",
            watering_frequency_days: careData?.watering_frequency_days || null,
            fertilizing_frequency_days: careData?.fertilizing_frequency_days || null,
            sunlight_needs: careData?.sunlight_needs || null,
        };

        try {
            await addPlant(newPlant);
            
            // Reset state
            setPlantName('');
            setSpecies('');
            setCareData(null);
            setSelectedLocation('living-room');
            setImageFiles([]);
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
            setImagePreviews([]);
            
            setSpeciesError('');
            onClose();
        } catch (error) {
            console.error("Failed to add plant:", error);
            if (error.code === '23503' || (error.message && error.message.includes('foreign key'))) {
                setSpeciesError("Please search and confirm a valid species first.");
            } else {
                setSpeciesError("Failed to integrate plant. Please try again.");
            }
        } finally {
            setIsUploading(false);
        }
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
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-xl shadow-2xl border border-outline-variant flex flex-col bg-surface-container-low z-10"
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
                                        <label className={`text-sm font-medium ml-1 ${speciesError ? 'text-red-400' : 'text-on-surface'}`}>Species</label>
                                        <div className="relative">
                                            <input
                                                className={`w-full border rounded-full py-2.5 px-5 focus:outline-none transition-all pr-12 bg-surface-container-highest ${
                                                    speciesError 
                                                        ? 'border-red-400/50 focus:border-red-400 focus:ring-1 focus:ring-red-400 text-red-200' 
                                                        : 'text-on-surface focus:border-primary focus:ring-1 focus:ring-primary border-outline-variant'
                                                }`} 
                                                placeholder="Search species..." 
                                                type="text"
                                                value={species}
                                                onChange={(e) => {
                                                    setSpecies(e.target.value);
                                                    setSpeciesError('');
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleSearch();
                                                    }
                                                }}
                                            />
                                            <button 
                                                type="button"
                                                onClick={handleSearch}
                                                disabled={isSearching || !species.trim()}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-2 rounded-full disabled:opacity-50"
                                            >
                                                {isSearching ? (
                                                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                ) : (
                                                    <span className="material-symbols-outlined">search</span>
                                                )}
                                            </button>
                                        </div>
                                        {speciesError && (
                                            <span className="text-xs text-red-400 mt-0.5 ml-2 absolute -bottom-5 left-0 whitespace-nowrap">{speciesError}</span>
                                        )}
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
                                    <label className="text-sm font-medium text-on-surface ml-1">Pictures</label>
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg, image/heic"
                                        className="hidden"
                                        multiple
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                    />
                                    <div className="flex items-center gap-3 mt-1">
                                        {imagePreviews.map((preview, idx) => (
                                            <div key={idx} className="w-24 h-24 rounded-xl overflow-hidden border border-outline-variant relative group">
                                                <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                                <button 
                                                    type="button"
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        ))}
                                        
                                        {imageFiles.length < 4 && (
                                            <div 
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-24 h-24 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-all cursor-pointer text-on-surface-variant hover:text-primary"
                                            >
                                                <span className="material-symbols-outlined text-[24px]">add</span>
                                                <span className="text-[10px] font-medium text-center leading-tight">Add Photo<br/>(Max 4)</span>
                                            </div>
                                        )}
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
                                        className="px-6 py-2.5 text-sm font-medium bg-primary text-on-primary rounded-full shadow-md hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2" 
                                        type="submit"
                                        disabled={isUploading}
                                    >
                                        {isUploading ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                                Uploading...
                                            </>
                                        ) : (
                                            "Integrate Plant"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>


                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
