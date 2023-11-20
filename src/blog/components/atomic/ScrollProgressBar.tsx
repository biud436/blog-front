/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import ReactDOM from 'react-dom';

import { URL_MAP } from '@/common/URL';
import { useRouter } from 'next/navigation';

const ProgressBarWrapper = createGlobalStyle`
    .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: #ff0000;
        transform-origin: 0%;
        z-index: 9999;
    }
`;

interface ScrollProgressBarProps {
    // empty
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = () => {
    const router = useRouter();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const [isRenderOK, setIsRenderOK] = React.useState(false);

    // if (router.pathname === URL_MAP.MAIN) {
    //     return null;
    // }

    useEffect(() => {
        scrollYProgress.onChange(() => {
            if (window.scrollY > 0) {
                setIsRenderOK(true);
            }
        });
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
    )!;
};

export const ForwardedScrollProgressBar = React.memo(
    React.forwardRef((props, _ref) => <ScrollProgressBar {...props} />),
);
