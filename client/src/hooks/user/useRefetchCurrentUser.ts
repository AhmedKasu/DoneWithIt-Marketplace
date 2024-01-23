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

const useRefetchCurrentUser = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const query = useQuery<CurrentUser, CustomAxiosError>({
    queryKey: ['currentUser'],
    queryFn: () => apiClient.getOne('me'),
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (currentUser !== undefined) return;

    if (query.data) {
      setCurrentUser(query.data);
    }

    query.refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, query.data, query.error]);

  return { refetch: query.refetch };
};

export default useRefetchCurrentUser;
