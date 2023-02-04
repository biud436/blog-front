import { useEffect, useRef } from 'react';

export type IntervalCallbackFC = VoidFunction;
export enum FAKE_CRON {
    EVERY_SECOND = 1000,
    EVERY_3_SECONDS = 3000,
    EVERY_1_MINUTE = 1000 * 60,
}

export function useTimedEffect(
    effect: IntervalCallbackFC,
    milliseconds: number,
) {
    const timeRef = useRef<NodeJS.Timeout>(null!);

    useEffect(() => {
        timeRef.current = setTimeout(effect, milliseconds);
        return () => clearTimeout(timeRef.current);
    }, [effect, milliseconds]);
}
