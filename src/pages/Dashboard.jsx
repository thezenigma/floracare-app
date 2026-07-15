import React, { useState, useEffect } from 'react';
import KPIStats from '../components/dashboard/KPIStats';
import AlertBanner from '../components/dashboard/AlertBanner';
import PlantRoster from '../components/dashboard/PlantRoster';
import ScrollReveal from '../components/ui/ScrollReveal';

import { usePlantContext } from '../context/PlantContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { plants: rosterData, loading, activeFilters } = usePlantContext();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [journalStreak, setJournalStreak] = useState(0);

    useEffect(() => {
        if (!user) return;
        const fetchStreak = async () => {
            const { data } = await supabase
                .from('user_profiles')
                .select('journal_streak_count')
                .eq('id', user.id)
                .single();
            if (data) {
                setJournalStreak(data.journal_streak_count || 0);
            }
        };
        fetchStreak();
    }, [user]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60 * 60 * 1000); // 1 hour
        return () => clearInterval(timer);
    }, []);

    const checkIsDue = (lastDateIso, freqDays) => {
        if (!freqDays) return false;
        if (!lastDateIso) return true;
        const last = new Date(lastDateIso);
        const nextTimeMs = last.getTime() + (freqDays * 24 * 60 * 60 * 1000);
        return nextTimeMs <= currentTime.getTime();
    };

    const duePlants = rosterData.filter(plant => {
        const isWaterDue = checkIsDue(plant.last_watered, plant.watering_frequency_days);
        const isFertDue = checkIsDue(plant.last_fertilized, plant.fertilizing_frequency_days);
        return plant.health_status === 'alert' || isWaterDue || isFertDue;
    });

    const alertDescription = duePlants.length > 0 
        ? `<b>${duePlants.map(p => p.name).join(', ')}</b> ${duePlants.length === 1 ? 'requires' : 'require'} your attention for watering, fertilizing, or health checks.`
        : "";

    const filteredRoster = rosterData.filter(plant => {
        // Health Filter
        if (activeFilters?.health === 'Needs Attention') {
            if (!duePlants.find(dp => dp.id === plant.id)) return false;
        } else if (activeFilters?.health === 'Healthy') {
            if (duePlants.find(dp => dp.id === plant.id)) return false;
        }
        
        // Location Filter
        if (activeFilters?.location && activeFilters.location !== 'All') {
            if (activeFilters.location === 'Other') {
                if (['Living Room', 'Bedroom', 'Office'].includes(plant.location)) return false;
            } else {
                if (plant.location !== activeFilters.location) return false;
            }
        }
        
        return true;
    });

    return (
        <div className="flex flex-col gap-6 relative h-full">
            <ScrollReveal direction="down">
                <KPIStats totalPlants={loading ? 0 : rosterData.length} criticalAlerts={duePlants.length} journalStreak={journalStreak} />
            </ScrollReveal>
            
            {duePlants.length > 0 && (
                <ScrollReveal direction="left" delay={0.1}>
                    <AlertBanner 
                        title="Action Required"
                        description={alertDescription}
                        onAction={() => navigate(`/plant/${duePlants[0].id}`)}
                    />
                </ScrollReveal>
            )}
            
            <ScrollReveal direction="up" delay={0.2} className="flex-1">
                <div className="flex-1">
                    <PlantRoster plants={filteredRoster} />
                </div>
            </ScrollReveal>
        </div>
    );
}
