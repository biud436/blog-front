import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { UNIQUE_PREFIX, useTocItems } from './useTocItems';

/**
 * 버그로 인해, IntersectionObserver를 사용하지 않고, `framer-motion`의 useScroll을 사용합니다.
 *
 * [useScrollTopTocItem](./useScrollTopTocItem.ts) 파일을 참고하세요.
 *
 * @returns
 */
export function useIntersectionObserver() {
    const observerableElements = useRef<HTMLAnchorElement[]>([]);
    const observer = useRef<IntersectionObserver>();
    const { anchorElements, changeActiveTocItem } = useTocItems();
    const [dir, setDir] = useState<'up' | 'down'>('down');
    const [prevTargetIndex, setPrevTargetIndex] = useState<number>(0);
    const visiableEntries = useRef<IntersectionObserverEntry[]>([]);

    const observerCallback: IntersectionObserverCallback = entries => {
        visiableEntries.current = [];
        entries.forEach(entry => {
            // 화면에 들어왔다
            if (entry.isIntersecting) {
                visiableEntries.current = [...visiableEntries.current, entry];

                getVisibleEntry();

                // 화면에 들어왔다.
                console.log('in : ' + entry.target);
            } else {
                // 화면에서 나갔다
                console.log('out : ' + entry.target);
            }
        });
    };

    const getVisibleEntry = () => {
        if (visiableEntries.current.length > 0) {
            // 화면에 들어온 엘리먼트 중 가장 위에 있는 엘리먼트를 찾는다.
            visiableEntries.current = visiableEntries.current
                ?.slice(0)
                .sort((a, b) => {
                    return (
                        a.target.getBoundingClientRect().top -
                        b.target.getBoundingClientRect().top
                    );
                });

            let target = visiableEntries.current[0].target;
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

                // 현재 타겟 인덱스의 요소를 활성화합니다.
                changeActiveTocItem(`${UNIQUE_PREFIX}-${targetIndex}`);
                setPrevTargetIndex(targetIndex);
            }
        }
    };

    const createObserver = () => {
        observerableElements.current = Array.from<HTMLAnchorElement>(
            document.querySelectorAll('.post-heading'),
        );

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: '-10% 0px -50% 0px',
        });

        observerableElements.current.forEach(element => {
            observer.observe(element);
        });

        return observer;
    };

    return { dir, visiableEntries, createObserver };
}
