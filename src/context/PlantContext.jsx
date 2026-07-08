import React, { createContext, useContext, useState } from 'react';

const defaultPlants = [
    {
        id: "monty",
        name: "Monty",
        species: "Monstera Deliciosa",
        location: "Living Room",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSZBryTK6AXJ2uyXkng9faY9klcWEMNGCj-CvkQRex5OpFTd_Y9drqIpqB0nOTFJYf3DIokEW1fgKFFoyp9PKf3c1ndXaVcewG3z7Q-WnOLMW3VS8WxhJQHMuPXcxOR4vJcZOGUXBAvfjusHg-8AIkntsvxdXOwDOkrmNscF5KrQREzfGP0PPdlzGdRvWEQS70WUOkT0XfYSdig6Zuf8NfH5tWYa8yrGtUomLWjzyFKMCEtaLER2VNSyDYZHb80qNHjgu5x1Sug_I",
        status: "alert",
        tags: [
            { label: "Water Overdue", icon: "water_drop", type: "error" },
            { label: "Low Humidity", icon: "air", type: "neutral" }
        ]
    },
    {
        id: "jadey",
        name: "Jadey",
        species: "Crassula Ovata",
        location: "Bedroom",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBriHsbUW9Gp8mLQlHCxpSg87r0xNhZ0aVX7q6kyi1lRIoAXSLQSPKRpcuxrpuyW0u4BCvuHGbRRkDvc27PMlmahHD0nxNLBiHjVGTUKId7UenIP_Nlh_DIjjLJjcnZ1e6ErYhfktKGntE8xOttl0sFR1wljF7uSuf_5G7cXe0c609X3AiXx3ZxmcHAcsYq-ZfpW3VsehmNelieVgussPbBL4t9_kc14xET5vbPyIEVTlIkxL-KJesBVi60p7qGBMN7d4wEEd2Dc3g",
        status: "optimal",
        tags: [
            { label: "Water in 4 days", icon: "schedule", type: "neutral" },
            { label: "Optimal Growth", icon: "check_circle", type: "neutral" }
        ]
    },
    {
        id: "aloe-vera",
        name: "Aloe Vera",
        species: "Collection",
        location: "Kitchen",
        status: "collection",
        tags: [
            { label: "2 Plants", icon: "potted_plant", type: "neutral" }
        ]
    }
];

const PlantContext = createContext();

export function PlantProvider({ children }) {
    const [plants, setPlants] = useState(defaultPlants);

    const updatePlant = (id, updatedData) => {
        setPlants(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    const addPlant = (newPlant) => {
        setPlants(prev => [...prev, newPlant]);
    };

    const removePlant = (id) => {
        setPlants(prev => prev.filter(p => p.id !== id));
    };

    return (
        <PlantContext.Provider value={{ plants, updatePlant, addPlant, removePlant }}>
            {children}
        </PlantContext.Provider>
    );
}

export function usePlantContext() {
    return useContext(PlantContext);
}
