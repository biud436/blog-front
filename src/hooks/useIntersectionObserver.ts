import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { UNIQUE_PREFIX, useTocItems } from './useTocItems';

export function useIntersectionObserver() {
    const observerableElements = useRef<HTMLAnchorElement[]>([]);
    const observer = useRef<IntersectionObserver>();
    const { anchorElements, changeActiveTocItem } = useTocItems();
    const [dir, setDir] = useState<'up' | 'down'>('down');
    const [prevTargetIndex, setPrevTargetIndex] = useState<number>(0);
    const visiableEntries = useRef<IntersectionObserverEntry[]>([]);

    const observerCallback: IntersectionObserverCallback = (
        entries,
        observer,
    ) => {
        visiableEntries.current = [];
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visiableEntries.current = [...visiableEntries.current, entry];

                getVisibleEntry();
            }
        });
    };

    const getVisibleEntry = () => {
        if (visiableEntries.current.length > 0) {
            // 화단 상단과 가장 가까운 요소를 찾습니다.
            visiableEntries.current = visiableEntries.current
                ?.slice(0)
                .sort((a, b) => {
                    return a.boundingClientRect.top - b.boundingClientRect.top;
                });

            const target = visiableEntries.current[0].target;
            if (target) {
                const targetIndex = observerableElements.current.findIndex(
                    e => e === target,
                );

                // 이전 타겟 인덱스보다 크면 아래로 스크롤한 것이고, 작으면 위로 스크롤한 것입니다.
                if (targetIndex > prevTargetIndex) {
                    setDir('down');
                } else {
                    setDir('up');
                }

                setPrevTargetIndex(targetIndex);

                // 현재 타겟 인덱스의 요소를 활성화합니다.
                changeActiveTocItem(`${UNIQUE_PREFIX}-${targetIndex}`);
            }
        }
    };

    const createObserver = () => {
        observerableElements.current = Array.from<HTMLAnchorElement>(
            document.querySelectorAll('.post-heading'),
        );

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: '64px 0px 0px 0px',
            threshold: 0.5,
            root: document.querySelector('.toast-ui-editor-contents'),
        });

        observerableElements.current.forEach(element => {
            observer.observe(element);
        });

        return observer;
    };

    return { dir, visiableEntries, createObserver };
}
