import { useQuery } from '@tanstack/react-query';
import { authService } from '../../api/authService';

export function useGetProfile() {
  const { data, error } = useQuery({
    queryKey: ['/auth/profile'],
    queryFn: authService.getProfileNoCache,
  });

  return {
    data,
    error,
  };
}
