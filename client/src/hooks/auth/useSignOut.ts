import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import APIClient from '../../services/apiClient';
import { useAuthContext } from '../../context/authContext';
import { useChatRoomContext } from '../../context/ChatRoomContext';

import { CustomAxiosError } from '../../types';

const apiClient = new APIClient<void>('/logout');

const useSignout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuthContext();
  const { setOpenChatRooms } = useChatRoomContext();
  return useMutation<void, CustomAxiosError>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      setTimeout(() => {
        navigate('/');
        setCurrentUser(undefined);
        setOpenChatRooms([]);
      }, 300);
    },
  });
};

export default useSignout;
