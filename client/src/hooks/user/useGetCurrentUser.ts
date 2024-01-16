import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import APIClient from '../../services/apiClient';
import { useAuthContext } from '../../context/authContext';
import { CustomAxiosError } from '../../types';

interface CurrentUser {
  id: number;
  name: string;
}

const apiClient = new APIClient<CurrentUser>('/users');

const useGetCurrentUser = () => {
  const { setCurrentUser } = useAuthContext();
  const query = useQuery<CurrentUser, CustomAxiosError>({
    queryKey: ['currentUser'],
    queryFn: () => apiClient.getOne('me'),
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (!query.isLoading && query.data) {
      setCurrentUser(query.data);
    }
    if (query.isError) {
      setCurrentUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, setCurrentUser]);

  return { refetch: query.refetch };
};

export default useGetCurrentUser;
