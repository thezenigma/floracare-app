import React from 'react';

export default function Button({ 
    children, 
    className = '', 
    variant = 'primary', // primary, secondary, outline, ghost
    size = 'md', // sm, md, lg
    isFullWidth = false,
    ...props 
}) {
    const baseClasses = "inline-flex items-center justify-center font-label-md rounded-full transition-all interactive-btn";
    
    const sizeClasses = {
        sm: "py-2 px-4 text-sm",
        md: "py-3 px-6",
        lg: "py-4 px-10 text-lg"
    };
    
    const variantClasses = {
        primary: "bg-primary text-white dark:text-[#002113] hover:opacity-90 shadow-lg shadow-primary/20",
        secondary: "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
        outline: "bg-transparent border border-outline-variant text-on-surface hover:border-primary/30 shadow-sm",
        ghost: "bg-transparent text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface",
        danger: "bg-error text-white dark:text-white hover:bg-error/90 shadow-lg shadow-error/20"
    };
    
    const widthClass = isFullWidth ? "w-full" : "";

    return (
        <button 
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}
