import React, { createContext, useContext, useState } from 'react';

import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const PlantContext = createContext();

export function PlantProvider({ children }) {
    const { user } = useAuth();
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState({ health: 'All', location: 'All' });

    React.useEffect(() => {
        if (!user) {
            setPlants([]);
            setLoading(false);
            return;
        }

        const fetchPlants = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('plants')
                .select('*, plant_tasks(*)')
                .eq('user_id', user.id);
                
            if (!error && data) {
                // Map database fields to frontend fields
                const formattedPlants = data.map(p => ({
                    ...p,
                    image: p.image_url,
                    status: p.health_status?.toLowerCase() || 'optimal'
                }));
                setPlants(formattedPlants);
            } else {
                console.error("Error fetching plants:", error);
            }
            setLoading(false);
        };

        fetchPlants();
    }, [user]);

    const updatePlant = async (id, updatedData) => {
        if (!user) return;
        
        // Optimistic update
        setPlants(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
        
        // Map frontend fields to database fields for update
        const dbUpdateData = { ...updatedData };
        if (updatedData.image) dbUpdateData.image_url = updatedData.image;
        if (updatedData.status) dbUpdateData.health_status = updatedData.status;
        
        const { error } = await supabase
            .from('plants')
            .update(dbUpdateData)
            .eq('id', id)
            .eq('user_id', user.id);
            
        if (error) {
            console.error("Error updating plant:", error);
            // Revert optimistic update ideally, but skipping for simplicity
        }
    };

    const addPlant = async (newPlant) => {
        if (!user) return;
        
        // Map frontend fields to database fields for insert
        const dbNewPlant = { 
            ...newPlant, 
            user_id: user.id,
            image_url: newPlant.image || null,
            health_status: newPlant.status || 'Optimal'
        };
        // Remove frontend specific fields before inserting
        delete dbNewPlant.image;
        delete dbNewPlant.status;

        const { data, error } = await supabase
            .from('plants')
            .insert([dbNewPlant])
            .select()
            .single();
            
        if (error) {
            console.error("Error adding plant:", error);
            throw error;
        }

        if (data) {
            setPlants(prev => [...prev, {
                ...data,
                image: data.image_url,
                status: data.health_status?.toLowerCase() || 'optimal'
            }]);
        }
    };

    const removePlant = async (id) => {
        if (!user) return;
        
        // Optimistic update
        setPlants(prev => prev.filter(p => p.id !== id));
        
        const { error } = await supabase
            .from('plants')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);
            
        if (error) {
            console.error("Error removing plant:", error);
        }
    };

    const addCustomTask = async (plantId, taskData) => {
        if (!user) return;
        
        const newTask = {
            ...taskData,
            plant_id: plantId,
            user_id: user.id
        };
        
        const { data, error } = await supabase
            .from('plant_tasks')
            .insert([newTask])
            .select()
            .single();
            
        if (!error && data) {
            setPlants(prev => prev.map(p => 
                p.id === plantId 
                    ? { ...p, plant_tasks: [...(p.plant_tasks || []), data] }
                    : p
            ));
        }
    };

    const updateCustomTask = async (taskId, plantId, updateData) => {
        if (!user) return;
        
        // Optimistic update
        setPlants(prev => prev.map(p => {
            if (p.id === plantId && p.plant_tasks) {
                return {
                    ...p,
                    plant_tasks: p.plant_tasks.map(t => t.id === taskId ? { ...t, ...updateData } : t)
                };
            }
            return p;
        }));
        
        await supabase
            .from('plant_tasks')
            .update(updateData)
            .eq('id', taskId);
    };

    const deleteCustomTask = async (taskId, plantId) => {
        if (!user) return;
        
        // Optimistic update
        setPlants(prev => prev.map(p => {
            if (p.id === plantId && p.plant_tasks) {
                return {
                    ...p,
                    plant_tasks: p.plant_tasks.filter(t => t.id !== taskId)
                };
            }
            return p;
        }));
        
        await supabase
            .from('plant_tasks')
            .delete()
            .eq('id', taskId);
    };

    return (
        <PlantContext.Provider value={{ plants, loading, updatePlant, addPlant, removePlant, addCustomTask, updateCustomTask, deleteCustomTask, activeFilters, setActiveFilters }}>
            {children}
        </PlantContext.Provider>
    );
}

export function usePlantContext() {
    return useContext(PlantContext);
}
