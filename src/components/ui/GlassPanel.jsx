import React from 'react';

export default function GlassPanel({ 
    children, 
    className = '', 
    as: Component = 'div',
    variant = 'morphism', // 'morphism' or 'panel'
    ...props 
}) {
    const baseClass = variant === 'morphism' ? 'glass-morphism' : 'glass-panel';
    return (
        <Component className={`${baseClass} ${className}`} {...props}>
            {children}
        </Component>
    );
}
