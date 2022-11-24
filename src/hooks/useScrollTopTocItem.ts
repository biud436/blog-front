import { useScroll } from 'framer-motion';
import { useEffect } from 'react';
import { UNIQUE_PREFIX, useTocItems } from './useTocItems';

export function useScrollTopTocItem() {
    const { anchorElements, changeActiveTocItem } = useTocItems();
    const { scrollY, scrollYProgress } = useScroll();

    useEffect(() => {
        return scrollY.onChange(y => {
            const tocItems = Array.from<HTMLAnchorElement>(
                document.querySelectorAll('.post-heading'),
            );
            const currentHeading = tocItems.find(item => {
                const { top } = item.getBoundingClientRect();
                return top > 0;
            });
            const visibleObjects = tocItems.filter(item => {
                const { top } = item.getBoundingClientRect();
                return top > 0;
            });

            const numOfVisibleObjects = visibleObjects.length;

            if (currentHeading) {
                let targetIndex = tocItems.indexOf(currentHeading);

                changeActiveTocItem(`${UNIQUE_PREFIX}-${targetIndex}`);
            }
        });
    }, []);

    return [scrollY];
}
