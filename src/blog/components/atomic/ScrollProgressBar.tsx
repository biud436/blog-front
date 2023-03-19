import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router';
import { URL_MAP } from '@/common/URL';
import React from 'react';

const ProgressBarWrapper = createGlobalStyle`
    .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        /* background: #66aaff; */
        background: #ff0000;
        transform-origin: 0%;
        z-index: 9999;
    }
`;

export const ScrollProgressBar = () => {
    const router = useRouter();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const [isRenderOK, setIsRenderOK] = React.useState(false);

    if (router.pathname === URL_MAP.MAIN) {
        return null;
    }

    useEffect(() => {
        scrollYProgress.onChange(() => {
            if (window.scrollY > 0) {
                setIsRenderOK(true);
            }
        });
    }, []);

    return ReactDOM.createPortal(
        <>
            {isRenderOK && <ProgressBarWrapper />}
            <motion.div
                className="progress-bar"
                style={{ scaleX }}
                initial="hidden"
                animate="show"
            />
        </>,
        document.body,
    );
};

export const ForwardedScrollProgressBar = React.memo(
    React.forwardRef(ScrollProgressBar),
);
