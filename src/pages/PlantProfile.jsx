import React from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';
import { usePlantContext } from '../context/PlantContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function PlantProfile() {
    const { id } = useParams();
    const { plants, updatePlant, addCustomTask, updateCustomTask, deleteCustomTask, loading } = usePlantContext();
    const { user } = useAuth();
    const plant = plants.find(p => p.id === (id || 'monty')) || plants[0];
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isLogTaskModalOpen, setIsLogTaskModalOpen] = React.useState(false);
    const [isAddingTask, setIsAddingTask] = React.useState(false);
    const [newTaskName, setNewTaskName] = React.useState('');
    const [newTaskFrequency, setNewTaskFrequency] = React.useState('Daily');
    const [customDays, setCustomDays] = React.useState('');
    const [customHours, setCustomHours] = React.useState('');
    const [customMinutes, setCustomMinutes] = React.useState('');
    const [isFreqDropdownOpen, setIsFreqDropdownOpen] = React.useState(false);
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);
    const freqDropdownRef = React.useRef(null);
    
    const [editImageFiles, setEditImageFiles] = React.useState([]);
    const [editImagePreviews, setEditImagePreviews] = React.useState([]);
    const [isUploadingEdit, setIsUploadingEdit] = React.useState(false);
    const [editError, setEditError] = React.useState('');
    const fileInputRefEdit = React.useRef(null);
    
    // Gather all images
    const allImages = React.useMemo(() => {
        if (!plant) return [];
        return [plant.image_url || plant.image, ...(plant.additional_image_urls || [])].filter(Boolean);
    }, [plant]);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (freqDropdownRef.current && !freqDropdownRef.current.contains(event.target)) {
                setIsFreqDropdownOpen(false);
            }
        };

        if (isFreqDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFreqDropdownOpen]);
    React.useEffect(() => {
        if (isEditModalOpen) {
            setEditImagePreviews([...allImages]);
            setEditImageFiles([...allImages]);
            setEditError('');
        } else {
            editImagePreviews.forEach((url, i) => {
                if (editImageFiles[i] instanceof File) URL.revokeObjectURL(url);
            });
            setEditImagePreviews([]);
            setEditImageFiles([]);
        }
    }, [isEditModalOpen, allImages]);
    
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60 * 60 * 1000); // Update every hour
        return () => clearInterval(timer);
    }, []);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <span className="material-symbols-outlined text-primary text-4xl mb-2">potted_plant</span>
                    <p className="font-label-md text-on-surface-variant">Loading plant details...</p>
                </div>
            </div>
        );
    }

    if (!plant) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
                <span className="material-symbols-outlined text-error text-6xl mb-4">sentiment_dissatisfied</span>
                <h2 className="font-headline-md text-on-surface mb-2">Plant Not Found</h2>
                <p className="font-body-md text-on-surface-variant mb-6">We couldn't find the plant you're looking for.</p>
                <Link to="/dashboard" className="px-6 py-2 bg-primary text-on-primary rounded-full font-label-md hover:scale-105 transition-transform">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    const getTimeStats = (lastDateIso, freqDays) => {
        if (!freqDays) return { lastText: "Unknown", nextText: "Unknown", isDue: false };
        if (!lastDateIso) return { lastText: "Never", nextText: "Due now", isDue: true };
        
        const last = new Date(lastDateIso);
        const diffMs = currentTime - last;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        
        let lastText = diffDays > 0 ? `${diffDays} day${diffDays > 1 ? 's' : ''} ago` : (diffHours > 0 ? `${diffHours} hour${diffHours > 1 ? 's' : ''} ago` : "Just now");
        
        const nextTimeMs = last.getTime() + (freqDays * 24 * 60 * 60 * 1000);
        const nextDiffMs = nextTimeMs - currentTime.getTime();
        const nextDiffDays = Math.floor(nextDiffMs / (1000 * 60 * 60 * 24));
        const nextDiffHours = Math.floor(nextDiffMs / (1000 * 60 * 60));
        
        let nextText;
        let isDue = nextDiffMs <= 0;
        
        if (isDue) {
            nextText = nextDiffDays < 0 ? `Overdue by ${Math.abs(nextDiffDays)} day${Math.abs(nextDiffDays) > 1 ? 's' : ''}` : "Due today";
        } else {
            nextText = nextDiffDays > 0 ? `In ${nextDiffDays} day${nextDiffDays > 1 ? 's' : ''}` : `In ${nextDiffHours} hour${nextDiffHours > 1 ? 's' : ''}`;
        }
        
        return { lastText, nextText, isDue };
    };

    const getCustomTaskStats = (task) => {
        if (!task.last_completed_at) return { isDue: true, nextText: "Due Now" };
        const lastDate = new Date(task.last_completed_at);
        const nextDate = new Date(lastDate.getTime() + task.frequency_minutes * 60000);
        const now = new Date();
        const diffMs = nextDate - now;
        const isDue = diffMs <= 0;
        
        let nextText;
        if (isDue) {
            nextText = "Due Now";
        } else {
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            if (diffDays > 0) nextText = `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
            else {
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                if (diffHours > 0) nextText = `Due in ${diffHours} hr${diffHours > 1 ? 's' : ''}`;
                else {
                    const diffMins = Math.floor(diffMs / (1000 * 60));
                    nextText = `Due in ${diffMins} min${diffMins > 1 ? 's' : ''}`;
                }
            }
        }
        return { isDue, nextText };
    };

    const waterStats = getTimeStats(plant.last_watered, plant.watering_frequency_days);
    const fertStats = getTimeStats(plant.last_fertilized, plant.fertilizing_frequency_days);

    const handleTaskDone = (type) => {
        const now = new Date().toISOString();
        if (type === 'water') updatePlant(plant.id, { last_watered: now });
        if (type === 'fertilize') updatePlant(plant.id, { last_fertilized: now });
    };

    const customTasksDueCount = (plant.plant_tasks || []).filter(t => getCustomTaskStats(t).isDue).length;
    const activeTasksCount = (waterStats.isDue ? 1 : 0) + (fertStats.isDue ? 1 : 0) + customTasksDueCount;
    const remainingText = activeTasksCount === 0 ? "All caught up!" : `${activeTasksCount} Task${activeTasksCount > 1 ? 's' : ''} Remaining`;

    const openLogTaskModal = () => {
        setIsLogTaskModalOpen(true);
    };

    const handleUpdateSchedule = () => {
        setIsLogTaskModalOpen(false);
    };

    const formatFreq = (minutes) => {
        if (!minutes) return 'Unknown';
        if (minutes === 60) return 'Hourly';
        if (minutes === 24 * 60) return 'Daily';
        if (minutes === 7 * 24 * 60) return 'Weekly';
        if (minutes === 30 * 24 * 60) return 'Monthly';
        const d = Math.floor(minutes / (24 * 60));
        const rem = minutes % (24 * 60);
        const h = Math.floor(rem / 60);
        const m = rem % 60;
        return `Every ${d > 0 ? d + 'd ' : ''}${h > 0 ? h + 'h ' : ''}${m > 0 ? m + 'm' : ''}`.trim();
    };

    const submitNewTask = () => {
        if (!newTaskName.trim()) return;
        
        let frequencyMinutes = 24 * 60;
        if (newTaskFrequency === 'Hourly') frequencyMinutes = 60;
        else if (newTaskFrequency === 'Daily') frequencyMinutes = 24 * 60;
        else if (newTaskFrequency === 'Weekly') frequencyMinutes = 7 * 24 * 60;
        else if (newTaskFrequency === 'Monthly') frequencyMinutes = 30 * 24 * 60;
        else if (newTaskFrequency === 'Custom Interval') {
            const d = parseInt(customDays) || 0;
            const h = parseInt(customHours) || 0;
            const m = parseInt(customMinutes) || 0;
            if (d === 0 && h === 0 && m === 0) return; // Prevent invalid
            frequencyMinutes = d * 24 * 60 + h * 60 + m;
        }

        addCustomTask(plant.id, {
            task_name: newTaskName.trim(),
            frequency_minutes: frequencyMinutes
        });
        
        setNewTaskName('');
        setNewTaskFrequency('Daily');
        setCustomDays('');
        setCustomHours('');
        setCustomMinutes('');
        setIsAddingTask(false);
    };

    const handleDeleteCustomTask = (taskId) => {
        deleteCustomTask(taskId, plant.id);
    };

    const handleCustomTaskDone = (taskId) => {
        updateCustomTask(taskId, plant.id, { last_completed_at: new Date().toISOString() });
    };
    
    const handleEditImageChange = (e) => {
        const files = Array.from(e.target.files);
        const availableSlots = 4 - editImagePreviews.length;
        const filesToAdd = files.slice(0, availableSlots);
        
        if (filesToAdd.length > 0) {
            setEditImageFiles(prev => [...prev, ...filesToAdd]);
            const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
            setEditImagePreviews(prev => [...prev, ...newPreviews]);
        }
        
        if (fileInputRefEdit.current) {
            fileInputRefEdit.current.value = '';
        }
        setEditError('');
    };
    
    const removeEditImage = (index) => {
        setEditImageFiles(prev => prev.filter((_, i) => i !== index));
        setEditImagePreviews(prev => {
            if (editImageFiles[index] instanceof File) {
                URL.revokeObjectURL(prev[index]);
            }
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        
        if (editImagePreviews.length === 0) {
            setEditError("Please add at least one image.");
            return;
        }
        setEditError('');
        setIsUploadingEdit(true);

        const formData = new FormData(e.target);
        
        try {
            let newImageUrls = [];
            
            for (let i = 0; i < editImagePreviews.length; i++) {
                const fileOrStr = editImageFiles[i];
                
                if (fileOrStr instanceof File && user) {
                    const fileExt = fileOrStr.name.split('.').pop();
                    const fileName = `${user.id}/${Date.now()}_${i}.${fileExt}`;
                    const { data } = await supabase.storage.from('plant_images').upload(fileName, fileOrStr);
                    if (data) {
                        const { data: publicUrlData } = supabase.storage.from('plant_images').getPublicUrl(fileName);
                        newImageUrls.push(publicUrlData.publicUrl);
                    }
                } else if (typeof fileOrStr === 'string') {
                    newImageUrls.push(fileOrStr);
                }
            }
            
            await updatePlant(plant.id, {
                name: formData.get('name'),
                location: formData.get('location'),
                image_url: newImageUrls[0],
                additional_image_urls: newImageUrls.slice(1)
            });
            
            setIsEditModalOpen(false);
        } catch (err) {
            console.error("Error updating profile:", err);
            setEditError("Failed to update profile.");
        } finally {
            setIsUploadingEdit(false);
        }
    };

    // Hardcoded to Monty for this view based on design
    return (
        <div className="flex flex-col gap-6 relative h-full w-full pb-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm">
                <Link to="/dashboard" className="hover:text-primary transition-colors">Garden</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span>{plant.name}</span>
            </div>

            {/* Header Area */}
            <ScrollReveal direction="down">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-[42px] font-bold text-primary leading-none tracking-tight">{plant.name}</h1>
                        <span className="text-[18px] italic text-on-surface-variant font-body-lg">{plant.species}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface font-label-md">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                            Edit Profile
                        </button>
                        <button onClick={openLogTaskModal} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container hover:opacity-90 transition-opacity text-on-primary-container font-label-md font-bold">
                            <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                            Log Care Task
                        </button>
                    </div>
                </div>
            </ScrollReveal>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column - Image */}
                <ScrollReveal direction="left" delay={0.1} className="lg:col-span-4 lg:col-start-1 flex flex-col gap-4">
                    <div className="w-full relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 aspect-[4/5] border border-outline-variant/10 bg-surface-container-low z-10">
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={activeImageIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                src={allImages[activeImageIndex]} 
                                alt={plant.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                    </div>
                    
                    {allImages.length > 1 && (
                        <div className="flex items-center justify-center gap-4 w-full pt-4 pb-2 px-2">
                            <AnimatePresence mode="popLayout">
                                {allImages.map((img, idx) => {
                                    if (idx === activeImageIndex) return null;
                                    return (
                                        <motion.button
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            key={img}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-outline-variant/30 opacity-70 hover:opacity-100 hover:border-primary transition-colors hover:shadow-md cursor-pointer focus:outline-none"
                                        >
                                            <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover pointer-events-none" />
                                        </motion.button>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </ScrollReveal>

                {/* Right Column - Stats & Schedule */}
                <ScrollReveal direction="up" delay={0.2} className="lg:col-span-7 lg:col-start-6 flex flex-col gap-6">
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Stat Card 1 */}
                        <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-6 flex flex-col items-start gap-2 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <span className="material-symbols-outlined text-[28px] text-primary">water_drop</span>
                            <div>
                                <p className="font-label-sm text-on-surface-variant text-[12px] mb-1">Last Watered</p>
                                <p className={`font-label-md font-bold text-[14px] ${waterStats.isDue ? 'text-error' : 'text-primary'}`}>{waterStats.lastText}</p>
                            </div>
                        </div>
                        {/* Stat Card 2 */}
                        <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-6 flex flex-col items-start gap-2 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <span className="material-symbols-outlined text-[28px] text-primary">eco</span>
                            <div>
                                <p className="font-label-sm text-on-surface-variant text-[12px] mb-1">Next Fertilizer</p>
                                <p className={`font-label-md font-bold text-[14px] ${fertStats.isDue ? 'text-error' : 'text-primary'}`}>{fertStats.nextText}</p>
                            </div>
                        </div>
                        {/* Stat Card 3 */}
                        <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-6 flex flex-col items-start gap-2 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <span className="material-symbols-outlined text-[28px] text-primary">wb_sunny</span>
                            <div>
                                <p className="font-label-sm text-on-surface-variant text-[12px] mb-1">Light Level</p>
                                <p className="font-label-md text-primary font-bold text-[14px] capitalize">{plant.sunlight_needs || "Bright Indirect"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Care Schedule */}
                    <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-8 flex flex-col shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="font-headline-sm text-[24px] text-primary font-medium">Care Schedule</h4>
                            <span className="text-label-sm font-label-sm text-on-surface-variant opacity-60">{remainingText}</span>
                        </div>
                        
                        <div className="flex flex-col gap-6">
                            {/* Task 1 - Active */}
                            <div className={`flex items-center justify-between p-6 rounded-lg border shadow-sm ${waterStats.isDue ? 'bg-error/5 border-error/30' : 'bg-primary-container/10 border-primary/20'}`}>
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${waterStats.isDue ? 'bg-error text-white' : 'bg-primary/20 text-primary'}`}>
                                        <span className="material-symbols-outlined">water_drop</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`font-label-md text-[14px] font-bold ${waterStats.isDue ? 'text-error' : 'text-primary'}`}>Watering</span>
                                        <span className="font-label-sm text-[12px] text-on-surface-variant mt-0.5">{waterStats.nextText}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => handleTaskDone('water')}
                                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${waterStats.isDue ? 'border-error text-error hover:bg-error hover:text-white' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">done</span>
                                    </button>
                                </div>
                            </div>

                            {/* Task 2 */}
                            <div className={`flex items-center justify-between p-6 rounded-lg border shadow-sm ${fertStats.isDue ? 'bg-error/5 border-error/30' : 'bg-primary-container/10 border-primary/20'}`}>
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${fertStats.isDue ? 'bg-error text-white' : 'bg-primary/20 text-primary'}`}>
                                        <span className="material-symbols-outlined">eco</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`font-label-md text-[14px] font-bold ${fertStats.isDue ? 'text-error' : 'text-primary'}`}>Fertilizing</span>
                                        <span className="font-label-sm text-[12px] text-on-surface-variant mt-0.5">{fertStats.nextText}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => handleTaskDone('fertilize')}
                                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${fertStats.isDue ? 'border-error text-error hover:bg-error hover:text-white' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">done</span>
                                    </button>
                                </div>
                            </div>

                            {/* Task 3 */}
                            <div className="flex items-center justify-between p-6 rounded-lg border shadow-sm bg-primary-container/10 border-primary/20">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-sm">
                                        <span className="material-symbols-outlined">content_cut</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-[14px] text-primary font-bold">Pruning</span>
                                        <span className="font-label-sm text-[12px] text-on-surface-variant mt-0.5">Scheduled as needed • Remove yellow leaves</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all border-primary text-primary hover:bg-primary hover:text-white">
                                        <span className="material-symbols-outlined text-[18px]">done</span>
                                    </button>
                                </div>
                            </div>
                            {/* Rendered Custom Tasks on Main Page */}
                            {(plant.plant_tasks || []).map((task) => {
                                const stats = getCustomTaskStats(task);
                                return (
                                <div key={`main-${task.id}`} className={`flex items-center justify-between p-6 rounded-lg border shadow-sm mt-4 ${stats.isDue ? 'bg-error/5 border-error/30' : 'bg-primary-container/10 border-primary/20'}`}>
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${stats.isDue ? 'bg-error text-white' : 'bg-primary/20 text-primary'}`}>
                                            <span className="material-symbols-outlined">local_florist</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`font-label-md text-[14px] font-bold ${stats.isDue ? 'text-error' : 'text-primary'}`}>{task.task_name}</span>
                                            <span className="font-label-sm text-[12px] text-on-surface-variant mt-0.5">{formatFreq(task.frequency_minutes)} • {stats.nextText}</span>
                                            {task.last_completed_at && <span className="text-[10px] text-on-surface-variant/60 mt-0.5">Last done: {new Date(task.last_completed_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => handleCustomTaskDone(task.id)}
                                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${stats.isDue ? 'border-error text-error hover:bg-error hover:text-white' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">done</span>
                                        </button>
                                    </div>
                                </div>
                            )})}
                        </div>

                        <div className="mt-10 pt-10 border-t border-outline-variant/20">
                            <button onClick={openLogTaskModal} className="w-full flex items-center justify-center gap-3 p-6 rounded-lg border-2 border-dashed border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all group">
                                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                                <span className="font-label-md font-medium">Add Custom Task</span>
                            </button>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Modals - Rendered via Portal to cover the entire viewport including SideNav */}
            {isEditModalOpen && createPortal(
                <div className="fixed inset-0 z-[100] items-center justify-center backdrop-blur-md px-4 flex">
                    <div className="absolute inset-0 backdrop-blur-md bg-black/20" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-surface-container rounded-[2rem] shadow-xl border border-outline-variant/30 flex flex-col md:flex-row transition-all duration-300 mx-auto">
                        <button className="absolute top-6 right-6 z-10 p-2 rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant" onClick={() => setIsEditModalOpen(false)}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="flex-1 p-6 flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-headline-lg text-[36px] text-primary leading-tight font-semibold">Edit Profile</h2>
                                <p className="text-on-surface-variant max-w-md">Refine {plant.name}'s profile details to ensure the most accurate care recommendations.</p>
                            </div>
                            <form className="flex flex-col gap-6" onSubmit={handleEditSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-1">
                                        <label className="font-label-md text-[14px] font-semibold text-on-surface ml-1">Plant Name</label>
                                        <input name="name" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder:text-on-surface-variant/30" type="text" defaultValue={plant.name}/>
                                    </div>
                                    <div className="flex flex-col gap-1 relative opacity-70">
                                        <label className="font-label-md text-[14px] font-semibold text-on-surface ml-1">Species Profile</label>
                                        <div className="relative">
                                            <input name="species" className="w-full bg-surface-variant border border-outline-variant/30 rounded-lg p-4 text-on-surface outline-none pr-12 cursor-not-allowed" type="text" defaultValue={plant.species} readOnly title="Species profile cannot be changed once integrated." />
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-label-md text-[14px] font-semibold text-on-surface ml-1">Location</label>
                                    <div className="relative">
                                        <input name="location" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none pr-12 placeholder:text-on-surface-variant/30" type="text" defaultValue={plant.location || 'Living Room'}/>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">location_on</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-4 pt-4">
                                    <button 
                                        className="px-8 py-3 font-label-md text-[14px] font-semibold text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-50" 
                                        onClick={() => setIsEditModalOpen(false)} 
                                        type="button"
                                        disabled={isUploadingEdit}
                                    >Cancel</button>
                                    <button 
                                        className="px-8 py-3 font-label-md text-[14px] font-semibold bg-primary text-on-primary rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2" 
                                        type="submit"
                                        disabled={isUploadingEdit}
                                    >
                                        {isUploadingEdit ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                                Saving...
                                            </>
                                        ) : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full md:w-96 bg-surface-container-lowest p-6 flex flex-col gap-4 border-l border-outline-variant/30">
                            <label className="font-label-md text-[14px] font-semibold text-on-surface">Pictures</label>
                            
                            <input 
                                type="file" 
                                accept="image/png, image/jpeg, image/heic"
                                className="hidden"
                                multiple
                                ref={fileInputRefEdit}
                                onChange={handleEditImageChange}
                            />
                            
                            <div className="flex flex-wrap items-center gap-3">
                                {editImagePreviews.map((preview, idx) => (
                                    <div key={idx} className={`${idx === 0 ? 'w-full aspect-[4/3]' : 'w-24 h-24'} rounded-xl overflow-hidden border border-outline-variant/30 relative group shadow-sm`}>
                                        <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                        <button 
                                            type="button"
                                            onClick={() => removeEditImage(idx)}
                                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                        >
                                            <span className="material-symbols-outlined text-[28px]">delete</span>
                                        </button>
                                        {idx === 0 && (
                                            <span className="absolute top-2 left-2 bg-primary-container text-on-primary-container px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">Main</span>
                                        )}
                                    </div>
                                ))}
                                
                                {editImagePreviews.length < 4 && (
                                    <div 
                                        onClick={() => fileInputRefEdit.current?.click()}
                                        className="w-24 h-24 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-all cursor-pointer text-on-surface-variant hover:text-primary"
                                    >
                                        <span className="material-symbols-outlined text-[24px]">add</span>
                                        <span className="text-[10px] font-medium text-center leading-tight">Add Photo<br/>(Max 4)</span>
                                    </div>
                                )}
                            </div>
                            {editError && <p className="text-error text-xs font-medium mt-1">{editError}</p>}
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {isLogTaskModalOpen && createPortal(
                <div className="fixed inset-0 z-[100] items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 flex">
                    <div className="absolute inset-0" onClick={() => setIsLogTaskModalOpen(false)}></div>
                    <div className="relative w-full max-w-[420px] p-8 md:p-10 rounded-[2rem] bg-surface-container-low max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col custom-scrollbar">
                        <button className="absolute top-6 right-6 p-2 text-on-surface-variant hover:text-primary transition-colors" onClick={() => setIsLogTaskModalOpen(false)}>
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                        
                        <div className="text-center space-y-2 mb-8 mt-2">
                            <h2 className="font-headline-sm text-[24px] font-semibold text-primary">Care Schedule</h2>
                            <p className="font-body-sm text-[14px] text-on-surface-variant px-4">Adjust {plant.name}'s care routines. Essential tasks are locked for plant health.</p>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            {/* Task 1 */}
                            <div className="flex items-center justify-between px-5 py-3.5 rounded-full bg-surface shadow-sm border border-outline-variant/10">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[20px]">water_drop</span>
                                    <span className="font-label-md font-semibold text-[14px] text-on-surface">Watering Frequency</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-label-sm font-medium text-[13px] text-on-surface">{plant.watering_frequency_days ? `Every ${plant.watering_frequency_days} days` : 'N/A'}</span>
                                    <span className="material-symbols-outlined text-on-surface-variant/40 text-[16px]" title="Essential Task">lock</span>
                                </div>
                            </div>
                            
                            {/* Task 2 */}
                            <div className="flex items-center justify-between px-5 py-3.5 rounded-full bg-surface shadow-sm border border-outline-variant/10">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[20px]">eco</span>
                                    <span className="font-label-md font-semibold text-[14px] text-on-surface">Fertilizing Cycle</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-label-sm font-medium text-[13px] text-on-surface">{plant.fertilizing_frequency_days ? `Every ${plant.fertilizing_frequency_days} days` : 'N/A'}</span>
                                    <span className="material-symbols-outlined text-on-surface-variant/40 text-[16px]" title="Essential Task">lock</span>
                                </div>
                            </div>
                            
                            {/* Task 3 */}
                            <div className="flex items-center justify-between px-5 py-3.5 rounded-full bg-surface shadow-sm border border-outline-variant/10">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[20px]">content_cut</span>
                                    <span className="font-label-md font-semibold text-[14px] text-on-surface">Pruning Schedule</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-label-sm font-medium text-[13px] text-on-surface">As needed</span>
                                    <span className="material-symbols-outlined text-on-surface-variant/40 text-[16px]" title="Essential Task">lock</span>
                                </div>
                            </div>
                            
                            <div className="pt-6 pb-2">
                                <p className="font-label-sm text-[11px] font-bold text-on-surface-variant/70 uppercase tracking-widest pl-2">CUSTOM TASKS</p>
                            </div>
                            
                            {/* Custom Tasks in Modal */}
                            {(plant.plant_tasks || []).map((task) => (
                                <div key={task.id} className="flex items-center justify-between px-5 py-3.5 rounded-full bg-surface shadow-sm border border-outline-variant/10 mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-[20px]">local_florist</span>
                                        <span className="font-label-md font-semibold text-[14px] text-on-surface">{task.task_name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-label-sm font-medium text-[13px] text-on-surface">{formatFreq(task.frequency_minutes)}</span>
                                        <button onClick={() => handleDeleteCustomTask(task.id)} className="text-on-surface-variant/50 hover:text-error transition-colors flex items-center">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Inline Add Task Form */}
                            {isAddingTask && (
                                <div className="bg-surface-container-high rounded-2xl p-5 shadow-sm border border-outline-variant/20 mt-1 mb-1 flex flex-col gap-3">
                                    <div>
                                        <label className="font-label-sm text-[11px] font-bold text-on-surface-variant/70 block mb-1.5">Task Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g., Leaf Cleaning" 
                                            value={newTaskName}
                                            onChange={(e) => setNewTaskName(e.target.value)}
                                            className="w-full bg-surface-container-highest rounded-lg px-4 py-2.5 text-on-surface text-[13px] outline-none focus:ring-1 focus:ring-primary border-none placeholder-on-surface-variant/40"
                                            autoFocus
                                        />
                                    </div>
                                    <div>
                                        <label className="font-label-sm text-[11px] font-bold text-on-surface-variant/70 block mb-1.5">Frequency</label>
                                        <div className="relative z-20" ref={freqDropdownRef}>
                                            <div 
                                                onClick={() => setIsFreqDropdownOpen(!isFreqDropdownOpen)}
                                                className="w-full bg-surface-container-highest rounded-lg px-4 py-2.5 text-on-surface text-[13px] outline-none border-none cursor-pointer flex items-center justify-between"
                                            >
                                                <span>{newTaskFrequency}</span>
                                                <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 text-[18px] ${isFreqDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                            </div>
                                            
                                            {isFreqDropdownOpen && (
                                                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-surface border border-outline-variant/30 rounded-lg py-1 shadow-lg z-30 overflow-hidden animate-stagger" style={{ animationDelay: '0ms' }}>
                                                        {['Hourly', 'Daily', 'Weekly', 'Monthly', 'Custom Interval'].map((option) => (
                                                            <div
                                                                key={option}
                                                                onClick={() => {
                                                                    setNewTaskFrequency(option);
                                                                    setIsFreqDropdownOpen(false);
                                                                }}
                                                                className={`px-4 py-2.5 cursor-pointer text-[13px] transition-colors duration-200 ${newTaskFrequency === option ? 'bg-primary/10 text-primary font-medium' : 'text-on-surface hover:bg-surface-container-high'}`}
                                                            >
                                                                {option === 'Custom Interval' ? 'Custom Interval...' : option}
                                                            </div>
                                                        ))}
                                                    </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {newTaskFrequency === 'Custom Interval' && (
                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <label className="font-label-sm text-[11px] font-bold text-on-surface-variant/70 block mb-1.5">Days</label>
                                                <input 
                                                    type="number" min="0" placeholder="0"
                                                    value={customDays} onChange={(e) => setCustomDays(e.target.value)}
                                                    className="w-full bg-surface-container-highest rounded-lg px-4 py-2.5 text-on-surface text-[13px] outline-none focus:ring-1 focus:ring-primary border-none placeholder-on-surface-variant/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="font-label-sm text-[11px] font-bold text-on-surface-variant/70 block mb-1.5">Hours</label>
                                                <input 
                                                    type="number" min="0" max="23" placeholder="0"
                                                    value={customHours} onChange={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        if (val > 23) setCustomHours('23');
                                                        else setCustomHours(e.target.value);
                                                    }}
                                                    className="w-full bg-surface-container-highest rounded-lg px-4 py-2.5 text-on-surface text-[13px] outline-none focus:ring-1 focus:ring-primary border-none placeholder-on-surface-variant/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="font-label-sm text-[11px] font-bold text-on-surface-variant/70 block mb-1.5">Minutes</label>
                                                <input 
                                                    type="number" min="0" max="59" placeholder="0"
                                                    value={customMinutes} onChange={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        if (val > 59) setCustomMinutes('59');
                                                        else setCustomMinutes(e.target.value);
                                                    }}
                                                    className="w-full bg-surface-container-highest rounded-lg px-4 py-2.5 text-on-surface text-[13px] outline-none focus:ring-1 focus:ring-primary border-none placeholder-on-surface-variant/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-end items-center gap-4 mt-2">
                                        <button onClick={() => setIsAddingTask(false)} className="text-[12px] font-medium text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
                                        <button onClick={submitNewTask} className="bg-primary text-on-primary px-5 py-2 rounded-full text-[12px] font-semibold hover:opacity-90 transition-opacity">Add Task</button>
                                    </div>
                                </div>
                            )}

                            <button onClick={() => setIsAddingTask(true)} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border border-dashed border-primary/40 text-primary hover:bg-primary/5 transition-colors mt-2">
                                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                <span className="font-label-md font-semibold text-[14px]">Add Custom Task</span>
                            </button>
                        </div>
                        
                        <div className="mt-8">
                            <button className="w-full py-4 rounded-full bg-primary text-on-primary font-label-md font-semibold text-[14px] shadow-lg hover:opacity-90 transition-opacity" onClick={handleUpdateSchedule}>
                                Update Schedule
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
