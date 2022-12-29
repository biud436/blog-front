import { useRef } from 'react';
import { StatelessInput } from '../app/components/common/StatelessInput';

/**
 * Proxy 패턴을 사용하여 inputRef.current?.value에 대체 접근하는 StatelessInput 훅입니다.
 * 리렌더링이 발생하지 않으며 다음 코드를 통해 값을 획득할 수 있습니다.
 *
 * const { value, StatelessInputForm } = useStatelessInput();
 *
 * return (
 *    <StatelessInputForm />
 * )
 *
 * 입력 값이 변경될 때 마다, value가 업데이트 됩니다.
 *
 * @returns
 */
export function useStatelessInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    return {
        inputRef,
        value: new Proxy(() => inputRef.current?.value, {
            get: target => {
                return target;
            },
        }),
        StatelessInputForm: () => <StatelessInput forwardedRef={inputRef} />,
    };
}
