import { useScroll } from 'framer-motion';
import { useEffect } from 'react';
import { UNIQUE_PREFIX, useTocItems } from './useTocItems';

export function useScrollTopTocItem() {
    const { anchorElements, changeActiveTocItem } = useTocItems();
    const { scrollY } = useScroll();

    useEffect(() => {
        return scrollY.onChange(y => {
            const tocItems = Array.from<HTMLAnchorElement>(
                document.querySelectorAll('.post-heading'),
            );
            const currentHeading = tocItems.find(item => {
                const { top } = item.getBoundingClientRect();
                return top > 0;
            });

            if (currentHeading) {
                // find index
                const targetIndex = tocItems.findIndex(
                    item => item === currentHeading,
                );
                changeActiveTocItem(`${UNIQUE_PREFIX}-${targetIndex}`);
            }
        });
    }, []);

    return [scrollY];
}
