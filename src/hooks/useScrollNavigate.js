import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Global variable to track the last navigation time across component unmounts/remounts.
// This prevents inertial trackpad scrolling from instantly triggering navigation on the NEXT page.
let lastNavigatedTime = 0;

export function useScrollNavigate({ prevPath, nextPath }) {
    const navigate = useNavigate();

    useEffect(() => {
        const handleWheel = (e) => {
            const now = Date.now();
            // 1.2 second global cooldown between navigations
            if (now - lastNavigatedTime < 1200) return;
            
            // Only navigate if at the boundaries of the page
            const isAtTop = window.scrollY <= 0;
            const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
            
            // Require a slightly more deliberate scroll (threshold 50)
            if (e.deltaY > 50 && nextPath && isAtBottom) {
                lastNavigatedTime = now;
                navigate(nextPath, { state: { direction: 'down' } });
            } else if (e.deltaY < -50 && prevPath && isAtTop) {
                lastNavigatedTime = now;
                navigate(prevPath, { state: { direction: 'up' } });
            }
        };

        // Use `{ passive: false }` if you ever need to preventDefault, but passive true is better for performance here
        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [navigate, prevPath, nextPath]);
}
