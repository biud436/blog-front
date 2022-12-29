import { useRef } from 'react';
import { StatelessInput } from '../app/components/common/StatelessInput';

/**
 * 리렌더링이 발생하지 않는 MUI Input을 사용하기 위한 hook
 * @returns
 */
export function useStatelessInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    return {
        inputRef,
        /**
         * inputRef.current.value를 리턴하는 프록시 객체이며,
         * 이를 통해 value에 접근하면 inputRef.current?.value을 호출하는 효과를 가집니다.
         */
        value: new Proxy(() => inputRef.current?.value, {
            get: (target, props) => {
                return target;
            },
        }),
        StatelessInputForm: () => <StatelessInput forwardedRef={inputRef} />,
    };
}
