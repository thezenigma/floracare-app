import React, { useState } from 'react';
import Button from '../ui/Button';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import { usePlantContext } from '../../context/PlantContext';

export default function SideNav({ isOpen, onClose, isMobileOnly = false }) {
    const location = useLocation();
    const isAssistant = location.pathname === '/assistant';
    const isDashboard = location.pathname === '/';
    const isPlantProfile = location.pathname.startsWith('/plant/');
    const { sessions, startNewChat, loadSession, deleteSession } = useChat();
    const { activeFilters, setActiveFilters } = usePlantContext();
    const [openSection, setOpenSection] = useState('health');
    
    const desktopClasses = isMobileOnly ? 'lg:hidden' : 'lg:relative lg:translate-x-0 lg:flex h-screen w-[260px] lg:sticky lg:top-0 border-r border-outline-variant/30';
    
    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-[70] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-background flex flex-col pt-8 pb-6 ${isMobileOnly ? 'w-[260px]' : desktopClasses}`}>
                
                {/* Mobile Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-primary transition-colors lg:hidden"
                >
                    <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
            {isAssistant ? (
                <>
                    <div className="flex items-center gap-3 px-6 mb-8">
                        <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-[24px]">psychiatry</span>
                        </div>
                        <div>
                            <h2 className="font-headline-sm text-[16px] text-primary font-bold">FloraCare AI</h2>
                            <p className="font-label-sm text-[12px] text-on-surface-variant">Botanical Expert</p>
                        </div>
                    </div>
                    <div className="px-6 mb-8">
                        <button onClick={startNewChat} className="w-full py-3 bg-primary text-white dark:text-[#002113] rounded-full flex items-center justify-center gap-2 font-label-md text-[14px] transition-all shadow-sm hover:opacity-90 active:scale-95">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            New Analysis
                        </button>
                    </div>
                    <nav className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto no-scrollbar">
                        <NavLink to="/assistant" className={({isActive}) => `flex items-center gap-3 py-3 px-4 rounded-full transition-colors ${isActive ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                            {({isActive}) => (
                                <>
                                    <span className="material-symbols-outlined text-[20px]" style={isActive ? {fontVariationSettings: '"FILL" 1'} : {}}>chat</span>
                                    <span className="font-body-md text-[15px] font-medium">Current Chat</span>
                                </>
                            )}
                        </NavLink>
                        <NavLink to="/dashboard" className="flex items-center gap-3 py-3 px-4 rounded-full transition-colors text-on-surface-variant hover:bg-surface-container-high hover:translate-x-1 duration-300">
                            <span className="material-symbols-outlined text-[20px]">local_florist</span>
                            <span className="font-body-md text-[15px] font-medium">Garden</span>
                        </NavLink>
                        <NavLink to="/journal" className="flex items-center gap-3 py-3 px-4 rounded-full transition-colors text-on-surface-variant hover:bg-surface-container-high hover:translate-x-1 duration-300">
                            <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                            <span className="font-body-md text-[15px] font-medium">Journal</span>
                        </NavLink>

                        {/* Recent Chats Section */}
                        {sessions.length > 0 && (
                            <div className="mt-6 flex flex-col gap-2">
                                <span className="font-label-md text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest px-4 mb-1">Recent Chats</span>
                                {sessions.map(session => (
                                    <div key={session.id} 
                                         onClick={() => loadSession(session.id)}
                                         className="flex justify-between items-center py-2 px-4 mx-2 rounded-xl cursor-pointer hover:bg-surface-container-high transition-colors group">
                                        <div className="flex flex-col overflow-hidden mr-2">
                                            <span className="font-body-md text-[14px] text-on-surface group-hover:text-primary transition-colors truncate">{session.title}</span>
                                            <span className="font-label-sm text-[11px] text-on-surface-variant/70">{session.date}</span>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-all"
                                            title="Delete Session"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">delete</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </nav>
                </>
            ) : (
                <>
                    <Link to="/dashboard" className="flex items-center px-6 mb-8 group cursor-pointer w-fit">
                        <span className="material-symbols-outlined text-primary text-3xl mr-2">eco</span>
                        <span className="font-bold text-[22px] text-primary tracking-tight">FloraCare</span>
                    </Link>
                    
                    <div className="flex-1 flex flex-col gap-8 overflow-y-auto no-scrollbar pr-4">
                        <div className="flex flex-col gap-1 px-4">
                            <NavLink to="/dashboard" className={({isActive}) => `flex items-center gap-3 py-3 px-4 rounded-full transition-colors ${isActive ? 'bg-primary text-white dark:text-[#002113] shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                                <span className="material-symbols-outlined text-[20px]">potted_plant</span>
                                <span className="font-body-md text-[15px] font-medium">Garden</span>
                            </NavLink>
                            <NavLink to="/journal" className={({isActive}) => `flex items-center gap-3 py-3 px-4 rounded-full transition-colors ${isActive ? 'bg-primary text-white dark:text-[#002113] shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                                <span className="font-body-md text-[15px] font-medium">Journal</span>
                            </NavLink>
                            <NavLink to="/assistant" className={({isActive}) => `flex items-center gap-3 py-3 px-4 rounded-full transition-colors ${isActive ? 'bg-primary text-white dark:text-[#002113] shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                                <span className="material-symbols-outlined text-[20px]">psychiatry</span>
                                <span className="font-body-md text-[15px] font-medium">AI Assistant</span>
                            </NavLink>
                        </div>

                        {!isPlantProfile && location.pathname !== '/journal' && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <div 
                                        className="flex items-center justify-between px-6 mb-2 group cursor-pointer"
                                        onClick={() => setOpenSection(openSection === 'health' ? null : 'health')}
                                    >
                                        <span className="font-label-md text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest">Health Status</span>
                                        <span className={`material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary transition-transform duration-300 ${openSection === 'health' ? 'rotate-180' : ''}`}>expand_more</span>
                                    </div>
                                    <div className={`flex-col gap-1 overflow-hidden transition-all duration-300 ${openSection === 'health' ? 'flex max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div onClick={() => setActiveFilters({ ...activeFilters, health: 'All' })} className={`flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer transition-colors hover-interactive ${activeFilters.health === 'All' ? 'bg-surface-container-highest' : 'hover:bg-surface-container-high'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeFilters.health === 'All' ? 'bg-primary' : 'border border-outline-variant bg-transparent'}`}></div>
                                            <span className={`font-body-md text-[14px] ${activeFilters.health === 'All' ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>All Plants</span>
                                        </div>
                                        <div onClick={() => setActiveFilters({ ...activeFilters, health: 'Needs Attention' })} className={`flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer transition-colors hover-interactive ${activeFilters.health === 'Needs Attention' ? 'bg-surface-container-highest' : 'hover:bg-surface-container-high'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeFilters.health === 'Needs Attention' ? 'bg-primary' : 'border border-outline-variant bg-transparent'}`}></div>
                                            <span className={`font-body-md text-[14px] ${activeFilters.health === 'Needs Attention' ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>Needs Attention</span>
                                        </div>
                                        <div onClick={() => setActiveFilters({ ...activeFilters, health: 'Healthy' })} className={`flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer transition-colors hover-interactive ${activeFilters.health === 'Healthy' ? 'bg-surface-container-highest' : 'hover:bg-surface-container-high'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeFilters.health === 'Healthy' ? 'bg-primary' : 'border border-outline-variant bg-transparent'}`}></div>
                                            <span className={`font-body-md text-[14px] ${activeFilters.health === 'Healthy' ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>Healthy</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <div 
                                        className="flex items-center justify-between px-6 mb-2 group cursor-pointer"
                                        onClick={() => setOpenSection(openSection === 'location' ? null : 'location')}
                                    >
                                        <span className="font-label-md text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest">Location</span>
                                        <span className={`material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary transition-transform duration-300 ${openSection === 'location' ? 'rotate-180' : ''}`}>expand_more</span>
                                    </div>
                                    <div className={`flex-col gap-1 overflow-hidden transition-all duration-300 ${openSection === 'location' ? 'flex max-h-56 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div onClick={() => setActiveFilters({ ...activeFilters, location: 'All' })} className={`flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer transition-colors hover-interactive ${activeFilters.location === 'All' ? 'bg-surface-container-highest' : 'hover:bg-surface-container-high'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeFilters.location === 'All' ? 'bg-primary' : 'border border-outline-variant bg-transparent'}`}></div>
                                            <span className={`font-body-md text-[14px] ${activeFilters.location === 'All' ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>All Locations</span>
                                        </div>
                                        <div onClick={() => setActiveFilters({ ...activeFilters, location: 'Living Room' })} className={`flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer transition-colors hover-interactive ${activeFilters.location === 'Living Room' ? 'bg-surface-container-highest' : 'hover:bg-surface-container-high'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeFilters.location === 'Living Room' ? 'bg-primary' : 'border border-outline-variant bg-transparent'}`}></div>
                                            <span className={`font-body-md text-[14px] ${activeFilters.location === 'Living Room' ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>Living Room</span>
                                        </div>
                                        <div onClick={() => setActiveFilters({ ...activeFilters, location: 'Bedroom' })} className={`flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer transition-colors hover-interactive ${activeFilters.location === 'Bedroom' ? 'bg-surface-container-highest' : 'hover:bg-surface-container-high'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeFilters.location === 'Bedroom' ? 'bg-primary' : 'border border-outline-variant bg-transparent'}`}></div>
                                            <span className={`font-body-md text-[14px] ${activeFilters.location === 'Bedroom' ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>Bedroom</span>
                                        </div>
                                        <div onClick={() => setActiveFilters({ ...activeFilters, location: 'Office' })} className={`flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer transition-colors hover-interactive ${activeFilters.location === 'Office' ? 'bg-surface-container-highest' : 'hover:bg-surface-container-high'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeFilters.location === 'Office' ? 'bg-primary' : 'border border-outline-variant bg-transparent'}`}></div>
                                            <span className={`font-body-md text-[14px] ${activeFilters.location === 'Office' ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>Office</span>
                                        </div>
                                        <div onClick={() => setActiveFilters({ ...activeFilters, location: 'Other' })} className={`flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer transition-colors hover-interactive ${activeFilters.location === 'Other' ? 'bg-surface-container-highest' : 'hover:bg-surface-container-high'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeFilters.location === 'Other' ? 'bg-primary' : 'border border-outline-variant bg-transparent'}`}></div>
                                            <span className={`font-body-md text-[14px] ${activeFilters.location === 'Other' ? 'text-on-surface font-medium' : 'text-on-surface-variant'}`}>Other</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    
                    {isDashboard && (
                        <div className="mt-auto pt-8 px-6">
                            <Button isFullWidth variant="primary" className="py-3 rounded-full flex items-center justify-center gap-2 shadow-none text-[14px] font-medium">
                                <span className="material-symbols-outlined text-[18px]">add</span> Add New Plant
                            </Button>
                        </div>
                    )}
                </>
            )}
        </aside>
        </>
    );
}
