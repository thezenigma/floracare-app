import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AuthGate({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-background text-on-background transition-colors duration-500">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="flex items-center mb-4">
                        <span className="material-symbols-outlined text-primary text-4xl mr-2">eco</span>
                        <span className="font-bold text-[32px] text-primary tracking-tight">FloraCare</span>
                    </div>
                    <p className="font-label-md text-on-surface-variant">Verifying access...</p>
                </div>
            </div>
        );
    }
    
    if (!user) {
        // Redirect them to the home page, but save the current location they were trying to go to
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}
