import React from 'react';
import SideNav from '../components/layout/SideNav';
import TopNav from '../components/layout/TopNav';
import { useLocation } from 'react-router-dom';

export default function DashboardLayout({ children }) {
    const location = useLocation();
    const isAssistant = location.pathname === '/assistant';

    return (
        <div className={`bg-background text-on-background font-body-md antialiased flex selection:bg-primary-container selection:text-on-primary-container transition-colors duration-500 ${isAssistant ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
            {/* Side Navigation */}
            <SideNav />

            {/* Main Content Area */}
            <main className={`flex-1 flex flex-col relative z-10 w-full ${isAssistant ? 'h-screen' : 'min-h-screen'}`}>
                <TopNav />
                <div className={`flex-1 mx-auto w-full flex flex-col ${isAssistant ? 'px-10 pb-0 pt-4 h-full relative' : 'px-10 py-8 max-w-[1400px]'}`}>
                    {children}
                </div>
            </main>
        </div>
    );
}
