import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import ReactDOM from 'react-dom';

const ProgressBarWrapper = createGlobalStyle`
    .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: #66aaff;
        transform-origin: 0%;
        z-index: 9999;
    }
`;

export const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <>
            <ProgressBarWrapper />
            <motion.div className="progress-bar" style={{ scaleX }} />
        </>
    );
};
