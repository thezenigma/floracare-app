import React from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import ScrollReveal from '../components/ui/ScrollReveal';
import { usePlantContext } from '../context/PlantContext';

export default function PlantProfile() {
    const { id } = useParams();
    const { plants, updatePlant } = usePlantContext();
    const plant = plants.find(p => p.id === (id || 'monty')) || plants[0];
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isLogTaskModalOpen, setIsLogTaskModalOpen] = React.useState(false);
    
    const [customTasks, setCustomTasks] = React.useState([
        { id: 1, name: 'Misting Routine', frequency: 'Daily', icon: 'mist' }
    ]);
    const [draftCustomTasks, setDraftCustomTasks] = React.useState([
        { id: 1, name: 'Misting Routine', frequency: 'Daily', icon: 'mist' }
    ]);
    const [isAddingTask, setIsAddingTask] = React.useState(false);
    const [newTaskName, setNewTaskName] = React.useState('');

    const openLogTaskModal = () => {
        setDraftCustomTasks([...customTasks]);
        setIsLogTaskModalOpen(true);
    };

    const handleUpdateSchedule = () => {
        setCustomTasks([...draftCustomTasks]);
        setIsLogTaskModalOpen(false);
    };

    const submitNewTask = () => {
        if (!newTaskName.trim()) return;
        setDraftCustomTasks([...draftCustomTasks, { id: Date.now(), name: newTaskName.trim(), frequency: 'Daily', icon: 'local_florist' }]);
        setNewTaskName('');
        setIsAddingTask(false);
    };

    const handleDeleteCustomTask = (taskId) => {
        setDraftCustomTasks(draftCustomTasks.filter(task => task.id !== taskId));
    };
    
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        updatePlant(plant.id, {
            name: formData.get('name'),
            species: formData.get('species'),
            location: formData.get('location')
        });
        setIsEditModalOpen(false);
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
                <ScrollReveal direction="left" delay={0.1} className="lg:col-span-4 lg:col-start-1">
                    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 aspect-[4/5] border border-outline-variant/10">
                        <img 
                            src={plant.image} 
                            alt={plant.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                        />
                    </div>
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
                                <p className="font-label-md text-primary font-bold text-[14px]">3 days ago</p>
                            </div>
                        </div>
                        {/* Stat Card 2 */}
                        <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-6 flex flex-col items-start gap-2 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <span className="material-symbols-outlined text-[28px] text-primary">eco</span>
                            <div>
                                <p className="font-label-sm text-on-surface-variant text-[12px] mb-1">Next Fertilizer</p>
                                <p className="font-label-md text-primary font-bold text-[14px]">In 10 days</p>
                            </div>
                        </div>
                        {/* Stat Card 3 */}
                        <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-6 flex flex-col items-start gap-2 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <span className="material-symbols-outlined text-[28px] text-primary">wb_sunny</span>
                            <div>
                                <p className="font-label-sm text-on-surface-variant text-[12px] mb-1">Light Level</p>
                                <p className="font-label-md text-primary font-bold text-[14px]">Bright Indirect</p>
                            </div>
                        </div>
                    </div>

                    {/* Care Schedule */}
                    <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-8 flex flex-col shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="font-headline-sm text-[24px] text-primary font-medium">Care Schedule</h4>
                            <span className="text-label-sm font-label-sm text-on-surface-variant opacity-60">{3 + customTasks.length} Tasks Remaining</span>
                        </div>
                        
                        <div className="flex flex-col gap-6">
                            {/* Task 1 - Active */}
                            <div className="flex items-center justify-between p-6 rounded-lg bg-primary-container/20 border border-primary/20 shadow-[0_0_15px_rgba(var(--color-primary),0.15)]">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-md">
                                        <span className="material-symbols-outlined">water_drop</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-[14px] text-primary font-bold">Watering</span>
                                        <span className="font-label-sm text-[12px] text-on-surface-variant mt-0.5">Due today • 500ml filtered water</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-on-surface-variant/50 text-[18px]" title="Essential Task">lock</span>
                                    <button className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all">
                                        <span className="material-symbols-outlined text-[18px]">done</span>
                                    </button>
                                </div>
                            </div>

                            {/* Task 2 */}
                            <div className="flex items-center justify-between p-6 rounded-lg bg-surface-container/40 border border-outline-variant/30">
                                <div className="flex items-center gap-6 opacity-60">
                                    <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                                        <span className="material-symbols-outlined">eco</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-[14px] text-on-surface font-bold">Fertilizing</span>
                                        <span className="font-label-sm text-[12px] text-on-surface-variant mt-0.5">Next due in 10 days • Liquid seaweed</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-on-surface-variant/50 text-[18px]" title="Essential Task">lock</span>
                                    <button className="w-10 h-10 rounded-full border-2 border-outline-variant/50 flex items-center justify-center text-outline-variant hover:border-primary hover:text-primary transition-all">
                                        <span className="material-symbols-outlined text-[18px]">done</span>
                                    </button>
                                </div>
                            </div>

                            {/* Task 3 */}
                            <div className="flex items-center justify-between p-6 rounded-lg bg-surface-container/40 border border-outline-variant/30">
                                <div className="flex items-center gap-6 opacity-60">
                                    <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                                        <span className="material-symbols-outlined">content_cut</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-[14px] text-on-surface font-bold">Pruning</span>
                                        <span className="font-label-sm text-[12px] text-on-surface-variant mt-0.5">Scheduled as needed • Remove yellow leaves</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-on-surface-variant/50 text-[18px]" title="Essential Task">lock</span>
                                    <button className="w-10 h-10 rounded-full border-2 border-outline-variant/50 flex items-center justify-center text-outline-variant hover:border-primary hover:text-primary transition-all">
                                        <span className="material-symbols-outlined text-[18px]">done</span>
                                    </button>
                                </div>
                            </div>
                            {/* Rendered Custom Tasks on Main Page */}
                            {customTasks.map((task) => (
                                <div key={`main-${task.id}`} className="flex items-center justify-between p-6 rounded-lg bg-surface-container/40 border border-outline-variant/30">
                                    <div className="flex items-center gap-6 opacity-80">
                                        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">{task.icon}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-label-md text-[14px] text-on-surface font-bold">{task.name}</span>
                                            <span className="font-label-sm text-[12px] text-on-surface-variant mt-0.5">{task.frequency}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="w-10 h-10 rounded-full border-2 border-outline-variant/50 flex items-center justify-center text-outline-variant hover:border-primary hover:text-primary transition-all">
                                            <span className="material-symbols-outlined text-[18px]">done</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
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
                                    <div className="flex flex-col gap-1 relative">
                                        <label className="font-label-md text-[14px] font-semibold text-on-surface ml-1">Species Profile</label>
                                        <div className="relative">
                                            <input name="species" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none pr-12 placeholder:text-on-surface-variant/30" type="text" defaultValue={plant.species}/>
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
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
                                    <button className="px-8 py-3 font-label-md text-[14px] font-semibold text-on-surface-variant hover:text-on-surface transition-colors" onClick={() => setIsEditModalOpen(false)} type="button">Cancel</button>
                                    <button className="px-8 py-3 font-label-md text-[14px] font-semibold bg-primary text-on-primary rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all" type="submit">Save Changes</button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full md:w-80 bg-surface-container-lowest p-6 flex flex-col gap-4 border-l border-outline-variant/30">
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-outline-variant/30">
                                <img alt="Plant preview" className="w-full h-full object-cover" src={plant.image}/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                    <div className="flex flex-col">
                                        <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full w-fit font-label-sm text-[12px] mb-2">Current Profile</span>
                                        <h3 className="font-headline-md text-[30px] font-medium text-white">{plant.name}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {isLogTaskModalOpen && createPortal(
                <div className="fixed inset-0 z-[100] items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 flex">
                    <div className="absolute inset-0" onClick={() => setIsLogTaskModalOpen(false)}></div>
                    <div className="relative w-full max-w-[420px] p-8 md:p-10 rounded-[2rem] bg-surface-container-low max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
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
                                    <span className="font-label-sm font-medium text-[13px] text-on-surface">Every 7 days</span>
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
                                    <span className="font-label-sm font-medium text-[13px] text-on-surface">Every 30 days</span>
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
                            
                            {/* Custom Tasks */}
                            {draftCustomTasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between px-5 py-3.5 rounded-full bg-surface shadow-sm border border-outline-variant/10">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-[20px]">{task.icon}</span>
                                        <span className="font-label-md font-semibold text-[14px] text-on-surface">{task.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-label-sm font-medium text-[13px] text-on-surface">{task.frequency}</span>
                                        <button onClick={() => handleDeleteCustomTask(task.id)} className="text-on-surface-variant/50 hover:text-error transition-colors flex items-center">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Inline Add Task Form */}
                            {isAddingTask && (
                                <div className="bg-surface-container-high rounded-2xl p-5 shadow-sm border border-outline-variant/20 mt-1 mb-1">
                                    <label className="font-label-sm text-[11px] font-bold text-on-surface-variant/70 block mb-2">Task Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g., Leaf Cleaning" 
                                        value={newTaskName}
                                        onChange={(e) => setNewTaskName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && submitNewTask()}
                                        className="w-full bg-surface-container-highest rounded-full px-4 py-2.5 text-on-surface text-[13px] outline-none focus:ring-1 focus:ring-primary border-none placeholder-on-surface-variant/40 mb-4"
                                        autoFocus
                                    />
                                    <div className="flex justify-end items-center gap-4">
                                        <button onClick={() => setIsAddingTask(false)} className="text-[12px] font-medium text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
                                        <button onClick={submitNewTask} className="bg-primary text-on-primary px-5 py-1.5 rounded-full text-[12px] font-semibold hover:opacity-90 transition-opacity">Add Task</button>
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
