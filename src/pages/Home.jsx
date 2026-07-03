import React from 'react';
import Onboarding from './Onboarding';
import Tutorial from './Tutorial';
import Dashboard from './Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';

export default function Home() {
    return (
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
            <section id="onboarding" className="h-screen w-full snap-start relative shrink-0">
                <Onboarding />
            </section>
            
            <section id="tutorial" className="h-screen w-full snap-start relative shrink-0">
                <Tutorial />
            </section>
            
            <section id="dashboard" className="min-h-screen w-full snap-start relative shrink-0">
                <DashboardLayout>
                    <Dashboard />
                </DashboardLayout>
            </section>
        </div>
    );
}
