import React from 'react';
import Button from '../ui/Button';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';

export default function SideNav() {
    const location = useLocation();
    const isAssistant = location.pathname === '/assistant';
    const isDashboard = location.pathname === '/';
    const isPlantProfile = location.pathname.startsWith('/plant/');
    const { sessions, startNewChat } = useChat();
    return (
        <aside className="hidden md:flex h-screen w-[260px] sticky left-0 top-0 bg-background border-r border-outline-variant/30 flex-col pt-8 pb-6 z-50 transition-colors duration-500">
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
                            <span className="material-symbols-outlined text-[20px]">history</span>
                            <span className="font-body-md text-[15px] font-medium">History</span>
                        </NavLink>

                        {/* Recent Chats Section */}
                        {sessions.length > 0 && (
                            <div className="mt-6 flex flex-col gap-2">
                                <span className="font-label-md text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest px-4 mb-1">Recent Chats</span>
                                {sessions.map(session => (
                                    <div key={session.id} className="flex flex-col py-2 px-4 mx-2 rounded-xl cursor-pointer hover:bg-surface-container-high transition-colors group">
                                        <span className="font-body-md text-[14px] text-on-surface group-hover:text-primary transition-colors truncate">{session.title}</span>
                                        <span className="font-label-sm text-[11px] text-on-surface-variant/70">{session.date}</span>
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

                        {!isPlantProfile && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <span className="font-label-md text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest px-6 mb-2">Health Status</span>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer bg-surface-container-highest hover-interactive">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                                            <span className="font-body-md text-[14px] text-on-surface font-medium">All Plants</span>
                                        </div>
                                        <div className="flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer hover:bg-surface-container-high transition-colors hover-interactive">
                                            <div className="w-1.5 h-1.5 rounded-full border border-outline-variant bg-transparent shrink-0"></div>
                                            <span className="font-body-md text-[14px] text-on-surface-variant">Needs Attention</span>
                                        </div>
                                        <div className="flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer hover:bg-surface-container-high transition-colors hover-interactive">
                                            <div className="w-1.5 h-1.5 rounded-full border border-outline-variant bg-transparent shrink-0"></div>
                                            <span className="font-body-md text-[14px] text-on-surface-variant">Healthy</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between px-6 mb-2 group cursor-pointer">
                                        <span className="font-label-md text-[11px] text-on-surface-variant font-semibold uppercase tracking-widest">Location</span>
                                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-colors">add</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer bg-surface-container-highest hover-interactive">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                                            <span className="font-body-md text-[14px] text-on-surface font-medium">Living Room</span>
                                        </div>
                                        <div className="flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer hover:bg-surface-container-high transition-colors hover-interactive">
                                            <div className="w-1.5 h-1.5 rounded-full border border-outline-variant bg-transparent shrink-0"></div>
                                            <span className="font-body-md text-[14px] text-on-surface-variant">Bedroom</span>
                                        </div>
                                        <div className="flex items-center gap-4 py-2.5 px-4 mx-2 rounded-full cursor-pointer hover:bg-surface-container-high transition-colors hover-interactive">
                                            <div className="w-1.5 h-1.5 rounded-full border border-outline-variant bg-transparent shrink-0"></div>
                                            <span className="font-body-md text-[14px] text-on-surface-variant">Office</span>
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
    );
}
