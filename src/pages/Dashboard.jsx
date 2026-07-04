import React from 'react';
import KPIStats from '../components/dashboard/KPIStats';
import AlertBanner from '../components/dashboard/AlertBanner';
import PlantRoster from '../components/dashboard/PlantRoster';
import ScrollReveal from '../components/ui/ScrollReveal';

import { usePlantContext } from '../context/PlantContext';

export default function Dashboard() {
    const { plants: rosterData } = usePlantContext();

    return (
        <div className="flex flex-col gap-6 relative h-full">
            <ScrollReveal direction="down">
                <KPIStats totalPlants={12} criticalAlerts={1} />
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.1}>
                <AlertBanner 
                    title="Action Required"
                    description="<b>Monty</b> (Monstera Deliciosa) is showing signs of low humidity and needs immediate watering. <b>Fernie</b> has a suspected pest issue (fungus gnats)."
                    onAction={() => console.log('View details')}
                />
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2} className="flex-1">
                <div className="flex-1">
                    <PlantRoster plants={rosterData} />
                </div>
            </ScrollReveal>
        </div>
    );
}
