/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';

/**
 * 오류를 출력합니다.
 * 모든 오류는 공통된 인터페이스를 가지고 있습니다.
 *
 * @param e
 */
export function handleAxiosError(e: any): any {
  if (e.response) {
    const { response } = e;
    const { data } = response;

    if (response.status === 403) {
      toast.error('권한이 없습니다.', {
        position: 'top-center',
      });
      return;
    } else if (response.status === 429) {
      toast.error('너무 많은 요청을 보냈습니다.', {
        position: 'top-center',
      });
      return;
    }

    const message = data.message || '알 수 없는 오류가 발생했습니다.';
    toast.error(message, {
      position: 'top-center',
    });
  } else if (e.request) {
    toast.error('서버와의 연결이 원활하지 않습니다', {
      position: 'top-center',
    });
  } else {
    console.log('Error', e.message);
    toast.error('알 수 없는 오류가 발생했습니다.', {
      position: 'top-center',
    });
  }
}
