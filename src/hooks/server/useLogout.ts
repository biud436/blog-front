import { useMutation } from '@tanstack/react-query';
import { authService } from '../../api/authService';
import { URL_MAP } from '../../common/URL';
import { useUserStore } from '@/store/user/UserStore';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearUser();

      setTimeout(() => {
        router.replace(URL_MAP.MAIN);
      }, 100);
    },
  });

  return {
    logout,
  };
}
