import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EntryLog from '../components/journal/EntryLog';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Journal() {
    const [activeFilter, setActiveFilter] = useState('All Activities');
    const [activeLogCategory, setActiveLogCategory] = useState('Observation');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileLogOpen, setIsMobileLogOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState('General Observation');

    const filters = ['All Activities', 'Growth', 'Maintenance'];
    const logCategories = ['Growth', 'Maintenance', 'Observation'];
    const plantOptions = ['General Observation', 'Monty (Monstera)', 'Jadey (Succulent)'];

    const entries = [
        {
            id: 1,
            plantName: "Monty",
            species: "Monstera Deliciosa",
            time: "Today • 10:45 AM",
            category: "Growth",
            content: "New leaf unfurled! The latest fenestrated leaf has fully hardened. It's noticeably larger than the previous one, showing great vitality in its new spot near the east window.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpRVWd8DmauqMJnhULMnqvozwM7bSfhV22XxGuZyCb3SnW2yXk2AJw9gOAI89QPjjXJJp_ng8BEMzY8GbCQn2zyYjyYUKOWo8B5-6J9yICbddpgjmVhVjtdE2fCJyxFTsyLyBNpHORQH2Ec4V8ppVjQVJYRsFPNH0hp4PX7mccB1s4nU74XUez0LIByPGlMb37lDYNWGO7d6QuaXM2oTnKXl5PKUjoCNCHphOiy_CLcFfnjJuEr6Bz6nIF6MHOLhMb2jbL4DEJbyI",
            isUrgent: false
        },
        {
            id: 2,
            plantName: "Jadey",
            species: "Crassula Ovata",
            time: "Yesterday • 04:20 PM",
            category: "Maintenance",
            content: "Watered. Standard 500ml filtered water session. Leaves felt a bit soft to the touch, indicating it was the right time to saturate the soil completely.",
            isUrgent: false
        },
        {
            id: 3,
            plantName: "Action Required: Fern Oasis",
            species: "",
            time: "Humidity Alert • 2h ago",
            category: "Urgent",
            content: "Humidity level dropped to 32%. Please refill the humidifier or mist the area immediately to prevent leaf browning.",
            isUrgent: true
        }
    ];

    const renderDailyLogForm = () => (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
                <label className="font-label-sm text-on-surface-variant mb-2 block text-[12px] font-medium">Tag a Plant</label>
                <div className="relative">
                    <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-background border border-outline-variant/30 rounded-[1rem] p-4 font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer transition-all duration-300 shadow-sm flex items-center justify-between relative z-20"
                    >
                        <span>{selectedPlant}</span>
                        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                    </div>
                    
                    {isDropdownOpen && (
                        <>
                            <div 
                                className="fixed inset-0 z-10"
                                onClick={() => setIsDropdownOpen(false)}
                            ></div>
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-surface border border-outline-variant/30 rounded-[1rem] py-2 shadow-lg z-30 overflow-hidden animate-stagger" style={{ animationDelay: '0ms' }}>
                                {plantOptions.map((option) => (
                                    <div
                                        key={option}
                                        onClick={() => {
                                            setSelectedPlant(option);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`px-4 py-3 cursor-pointer text-[14px] transition-colors duration-200 ${selectedPlant === option ? 'bg-primary/10 text-primary font-medium' : 'text-on-surface hover:bg-surface-container-high'}`}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div>
                <label className="font-label-sm text-on-surface-variant mb-2 block text-[12px] font-medium">Category</label>
                <div className="flex flex-wrap gap-2">
                    {logCategories.map(category => (
                        <button 
                            key={category}
                            onClick={() => setActiveLogCategory(category)}
                            className={`px-4 py-2 rounded-full font-label-sm text-[12px] transition-all duration-300 ${activeLogCategory === category ? 'bg-primary text-white dark:text-[#002113] shadow-sm border border-transparent' : 'border border-outline-variant/50 bg-surface text-on-surface hover:bg-surface-container-high'}`}
                            type="button"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="font-label-sm text-on-surface-variant mb-2 block text-[12px] font-medium">Observations</label>
                <textarea className="w-full bg-background border border-outline-variant/30 rounded-xl p-4 font-body-md text-[14px] text-on-surface placeholder:text-[13px] placeholder:font-light placeholder:text-on-surface-variant/70 focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all duration-300 shadow-sm" placeholder="What did you notice today?" rows="4"></textarea>
            </div>
            <div className="flex gap-4">
                <button className="flex-1 bg-primary text-white dark:text-[#002113] py-3 rounded-full font-label-md text-[14px] shadow-sm hover:opacity-90 transition-opacity" type="submit">
                    Save Entry
                </button>
                <button className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors" type="button">
                    <span className="material-symbols-outlined">add_a_photo</span>
                </button>
            </div>
        </form>
    );

    return (
        <div className="flex flex-col gap-6 relative h-full w-full">
            <ScrollReveal direction="down">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-headline-sm text-primary font-bold text-[24px]">Progress Journal</h2>
                </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Primary Feed */}
                <section className="lg:col-span-8 space-y-6">
                    <ScrollReveal direction="left" delay={0.1}>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar mb-4 lg:mb-6">
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-6 py-2 rounded-full font-label-md text-[14px] transition-colors duration-300 shadow-sm whitespace-nowrap ${activeFilter === filter ? 'bg-primary text-white dark:text-[#002113]' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:bg-surface-container-highest'}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                        
                        <div className="lg:hidden mb-6">
                            <button 
                                onClick={() => setIsMobileLogOpen(!isMobileLogOpen)}
                                className={`w-full flex items-center justify-between p-4 bg-surface border border-outline-variant/30 shadow-sm text-primary font-headline-sm font-bold text-[20px] transition-all ${isMobileLogOpen ? 'rounded-t-2xl border-b-0' : 'rounded-2xl'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[24px]">edit_note</span>
                                    Daily Log
                                </div>
                                <span className={`material-symbols-outlined transition-transform duration-300 ${isMobileLogOpen ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>
                            
                            {/* Mobile Dropdown Form */}
                            {isMobileLogOpen && (
                                <div className="bg-surface rounded-b-2xl p-6 shadow-sm border border-outline-variant/30 border-t-0 animate-stagger" style={{ animationDelay: '0ms' }}>
                                    {renderDailyLogForm()}
                                </div>
                            )}
                        </div>
                    </ScrollReveal>
                    <div className="flex flex-col gap-6">
                        {entries.map((entry, index) => (
                            <ScrollReveal key={entry.id} direction="up" delay={0.1 * (index + 2)}>
                                <EntryLog entry={entry} index={index} />
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

                {/* Right Sidebar */}
                <aside className="lg:col-span-4 space-y-6">
                    <ScrollReveal direction="right" delay={0.3}>
                        <section className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/30 sticky top-28 transition-colors duration-500">
                            <div className="hidden lg:block">
                                <h3 className="font-headline-sm text-primary font-bold mb-6 flex items-center gap-2 text-[20px]">
                                    <span className="material-symbols-outlined text-primary">edit_note</span>
                                    Daily Log
                                </h3>
                                {renderDailyLogForm()}
                            </div>
                            
                            <div className="mt-8 relative overflow-hidden rounded-2xl bg-primary-container p-6 text-on-primary-container shadow-sm border border-primary/20">
                                <div className="relative z-10">
                                    <h3 className="font-label-md text-[14px] mb-2 opacity-80 uppercase tracking-widest font-semibold">Journaling Streak</h3>
                                    <div className="flex items-end gap-2">
                                        <span className="font-display-lg text-[48px] leading-none font-semibold">12</span>
                                        <span className="font-body-md text-[16px] mb-1 opacity-70">Days</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.4}>
                        <div className="grid grid-cols-2 gap-4 transition-colors duration-500">
                            <div className="bg-surface p-6 rounded-xl text-center shadow-sm border border-outline-variant/30 hover:-translate-y-1 transition-transform cursor-pointer">
                                <p className="font-headline-sm text-[24px] font-bold text-primary">142</p>
                                <p className="font-label-sm text-[12px] text-on-surface-variant mt-1">Total Entries</p>
                            </div>
                            <div className="bg-surface p-6 rounded-xl text-center shadow-sm border border-outline-variant/30 hover:-translate-y-1 transition-transform cursor-pointer">
                                <p className="font-headline-sm text-[24px] font-bold text-primary">8</p>
                                <p className="font-label-sm text-[12px] text-on-surface-variant mt-1">Active Plants</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </aside>
            </div>
        </div>
    );
}
