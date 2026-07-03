import React from 'react';
import GlassPanel from './GlassPanel';

export default function Modal({ isOpen, onClose, children, className = '' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <GlassPanel variant="panel" className={`w-full max-w-md p-lg rounded-xl flex flex-col gap-6 relative overflow-hidden animate-in zoom-in-95 duration-300 ${className}`}>
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 hover:bg-surface-container/50 rounded-full transition-colors text-on-surface-variant hover:text-on-surface"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                {children}
            </GlassPanel>
        </div>
    );
}
