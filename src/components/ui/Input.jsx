import React from 'react';

export default function Input({ 
    label,
    id,
    type = 'text',
    className = '',
    containerClassName = '',
    icon,
    ...props 
}) {
    return (
        <div className={`flex flex-col gap-1 ${containerClassName}`}>
            {label && (
                <label htmlFor={id} className="font-label-md text-caption text-on-surface-variant px-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]">
                        {icon}
                    </span>
                )}
                <input
                    id={id}
                    type={type}
                    className={`w-full bg-surface-container-lowest border border-outline-variant rounded-full py-3 px-5 text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 shadow-inner transition-all ${icon ? 'pl-12' : ''} ${className}`}
                    {...props}
                />
            </div>
        </div>
    );
}
