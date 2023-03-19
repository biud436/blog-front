import { useScroll } from 'framer-motion';
import { useEffect } from 'react';
import { UNIQUE_PREFIX, useTocItems } from './useTocItems';

export function useScrollTopTocItem() {
    const { changeActiveTocItem } = useTocItems();
    const { scrollY } = useScroll();

    useEffect(() => {
        return scrollY.onChange(() => {
            const tocItems = Array.from<HTMLAnchorElement>(
                document.querySelectorAll('.post-heading'),
            );
            const currentHeading = tocItems.find(item => {
                const { top } = item.getBoundingClientRect();
                return top > 0;
            });

            if (currentHeading) {
                const targetIndex = tocItems.indexOf(currentHeading);

                changeActiveTocItem(`${UNIQUE_PREFIX}-${targetIndex}`);
            }
        });
    }, []);

    return [scrollY];
}
