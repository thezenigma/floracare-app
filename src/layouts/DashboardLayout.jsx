import React, { useState } from 'react';
import SideNav from '../components/layout/SideNav';
import TopNav from '../components/layout/TopNav';
import { useLocation } from 'react-router-dom';

export default function DashboardLayout({ children }) {
    const location = useLocation();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const isAssistant = location.pathname === '/assistant';

    return (
        <div className={`bg-background text-on-background font-body-md antialiased flex selection:bg-primary-container selection:text-on-primary-container transition-colors duration-500 ${isAssistant ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
            {/* Side Navigation */}
            <SideNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

            {/* Main Content Area */}
            <main className={`flex-1 flex flex-col relative z-10 w-full ${isAssistant ? 'h-screen' : 'min-h-screen'}`}>
                <TopNav onMenuClick={() => setIsMobileNavOpen(true)} />
                <div className={`flex-1 mx-auto w-full flex flex-col min-h-0 ${isAssistant ? 'px-4 lg:px-10 pb-0 pt-4 relative' : 'px-4 py-6 lg:px-10 lg:py-8 max-w-[1400px]'}`}>
                    {children}
                </div>
            </main>
        </div>
    );
}
