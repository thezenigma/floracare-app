import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollReveal({ 
    children, 
    direction = 'up', // 'up', 'down', 'left', 'right'
    delay = 0,
    className = "",
    duration = 0.5
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.1 });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: duration * 0.8, // Faster duration for snappier feel
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1], // Snappier bezier curve
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}
