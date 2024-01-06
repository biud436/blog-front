import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import * as React from 'react';

export const ForcusToc = ({
    setActiveId,
}: {
    setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const isInView = useInView(ref, {});

    useEffect(() => {
        const items = Array.from<HTMLAnchorElement>(
            document.querySelectorAll('.toc a'),
        );

        if (ref.current?.parentElement) {
            const { parentElement } = ref.current;

            if (isInView) {
                const targets = items.filter(item =>
                    item.getAttribute('href')?.includes(`#${parentElement.id}`),
                );

                targets.forEach(target => {
                    // target.classList.add('active');
                    setActiveId(target.id);
                });
            }
        }
    }, [isInView]);

    return (
        <div ref={ref}>
            <div className={isInView ? 'in-view' : ''}></div>
        </div>
    );
};
