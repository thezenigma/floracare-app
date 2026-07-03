import React from 'react';
import Button from '../ui/Button';

export default function AlertBanner({ title, description, onAction }) {
    return (
        <div className="bg-[#fff0f0] dark:bg-[#3a2d2d] rounded-r-[2rem] rounded-l-none border-l-[6px] border-error p-8 flex items-start gap-6 shadow-sm mb-6 animate-stagger transition-colors duration-500" style={{ animationDelay: '250ms' }}>
            <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center shrink-0 mt-1">
                <span className="material-symbols-outlined text-error text-[20px]">priority_high</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-headline-sm text-error text-[16px] font-semibold">{title}</h3>
                <p className="font-body-md text-on-surface max-w-2xl leading-relaxed text-[15px]" dangerouslySetInnerHTML={{ __html: description }}></p>
                <div className="mt-2">
                    <Button variant="danger" className="rounded-full px-6 py-2.5 font-medium text-[14px]" onClick={onAction}>
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
}
