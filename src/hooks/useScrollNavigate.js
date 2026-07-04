import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Global variable to track the last navigation time across component unmounts/remounts.
// This prevents inertial trackpad scrolling from instantly triggering navigation on the NEXT page.
let lastNavigatedTime = 0;

export function useScrollNavigate({ prevPath, nextPath }) {
    const navigate = useNavigate();
    const touchStartY = useRef(0);

    useEffect(() => {
        const handleWheel = (e) => {
            const now = Date.now();
            // 1.2 second global cooldown between navigations
            if (now - lastNavigatedTime < 1200) return;
            
            // Find the active scroll container for this page
            const container = e.target.closest('.page-scroll-container') || document.documentElement;
            
            // Only navigate if at the boundaries of the container
            const isAtTop = container.scrollTop <= 0;
            const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
            
            // Require a slightly more deliberate scroll (threshold 50)
            if (e.deltaY > 50 && nextPath && isAtBottom) {
                lastNavigatedTime = now;
                navigate(nextPath, { state: { direction: 'down' } });
            } else if (e.deltaY < -50 && prevPath && isAtTop) {
                lastNavigatedTime = now;
                navigate(prevPath, { state: { direction: 'up' } });
            }
        };

        const handleTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            const now = Date.now();
            if (now - lastNavigatedTime < 1200) return;

            const touchEndY = e.changedTouches[0].clientY;
            // delta > 0 means scrolled down the page (finger moved up) => go to nextPath
            // delta < 0 means scrolled up the page (finger moved down) => go to prevPath
            const deltaY = touchStartY.current - touchEndY;

            const container = e.target.closest('.page-scroll-container') || document.documentElement;
            const isAtTop = container.scrollTop <= 0;
            const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;

            if (deltaY > 50 && nextPath && isAtBottom) {
                lastNavigatedTime = now;
                navigate(nextPath, { state: { direction: 'down' } });
            } else if (deltaY < -50 && prevPath && isAtTop) {
                lastNavigatedTime = now;
                navigate(prevPath, { state: { direction: 'up' } });
            }
        };

        // Use `{ passive: true }` for better performance on mobile
        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [navigate, prevPath, nextPath]);
}
