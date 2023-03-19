import { useCallback, useEffect, useRef } from 'react';

export const UNIQUE_PREFIX = 'toc-item';

export function useTocItems() {
    const anchorElements = useRef<HTMLAnchorElement[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            anchorElements.current = Array.from<HTMLAnchorElement>(
                document.querySelectorAll('.toc a'),
            );
        }
    }, [anchorElements]);

    /**
     * ID를 지정합니다.
     */
    useEffect(() => {
        anchorElements.current.forEach((item, index) => {
            const ID = `${UNIQUE_PREFIX}-${index}`;

            item.setAttribute('id', ID);
        });

        changeActiveTocItem(`${UNIQUE_PREFIX}-0`);
    }, [anchorElements.current]);

    const setAnchorElements = useCallback((node: HTMLAnchorElement[]) => {
        anchorElements.current = node;
    }, []);

    const changeActiveTocItem = (id: string) => {
        anchorElements.current.forEach(anchor => {
            if (anchor.id === id) {
                anchor.classList.add('active');
            } else {
                anchor.classList.remove('active');
            }
        });
    };

    return { anchorElements: setAnchorElements, changeActiveTocItem };
}
