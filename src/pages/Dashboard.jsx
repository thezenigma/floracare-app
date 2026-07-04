import React from 'react';
import KPIStats from '../components/dashboard/KPIStats';
import AlertBanner from '../components/dashboard/AlertBanner';
import PlantRoster from '../components/dashboard/PlantRoster';

export default function Dashboard() {
    const rosterData = [
        {
            name: "Monty",
            species: "Monstera Deliciosa",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSZBryTK6AXJ2uyXkng9faY9klcWEMNGCj-CvkQRex5OpFTd_Y9drqIpqB0nOTFJYf3DIokEW1fgKFFoyp9PKf3c1ndXaVcewG3z7Q-WnOLMW3VS8WxhJQHMuPXcxOR4vJcZOGUXBAvfjusHg-8AIkntsvxdXOwDOkrmNscF5KrQREzfGP0PPdlzGdRvWEQS70WUOkT0XfYSdig6Zuf8NfH5tWYa8yrGtUomLWjzyFKMCEtaLER2VNSyDYZHb80qNHjgu5x1Sug_I",
            status: "alert",
            tags: [
                { label: "Water Overdue", icon: "water_drop", type: "error" },
                { label: "Low Humidity", icon: "air", type: "neutral" }
            ]
        },
        {
            name: "Jadey",
            species: "Crassula Ovata",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBriHsbUW9Gp8mLQlHCxpSg87r0xNhZ0aVX7q6kyi1lRIoAXSLQSPKRpcuxrpuyW0u4BCvuHGbRRkDvc27PMlmahHD0nxNLBiHjVGTUKId7UenIP_Nlh_DIjjLJjcnZ1e6ErYhfktKGntE8xOttl0sFR1wljF7uSuf_5G7cXe0c609X3AiXx3ZxmcHAcsYq-ZfpW3VsehmNelieVgussPbBL4t9_kc14xET5vbPyIEVTlIkxL-KJesBVi60p7qGBMN7d4wEEd2Dc3g",
            status: "optimal",
            tags: [
                { label: "Water in 4 days", icon: "schedule", type: "neutral" },
                { label: "Optimal Growth", icon: "check_circle", type: "neutral" }
            ]
        },
        {
            name: "Aloe Vera",
            species: "Collection",
            status: "collection",
            tags: [
                { label: "2 Plants", icon: "potted_plant", type: "neutral" }
            ]
        }
    ];

    return (
        <div className="flex flex-col gap-6 relative h-full">
            <KPIStats totalPlants={12} criticalAlerts={1} />
            
            <AlertBanner 
                title="Action Required"
                description="<b>Monty</b> (Monstera Deliciosa) is showing signs of low humidity and needs immediate watering. <b>Fernie</b> has a suspected pest issue (fungus gnats)."
                onAction={() => console.log('View details')}
            />
            
            <div className="flex-1">
                <PlantRoster plants={rosterData} />
            </div>
        </div>
    );
}
