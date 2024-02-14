import { useQuery } from '@tanstack/react-query';

import APIClient from '../../services/apiClient';
import { CustomAxiosError, ChatRoom } from '../../types';

const apiClient = new APIClient<ChatRoom>('/chat-rooms');

const useGetChatRoom = (chatRoomId: string) => {
  return useQuery<ChatRoom, CustomAxiosError>({
    queryKey: ['user-chat-room', chatRoomId],
    queryFn: () => apiClient.getOne(`/${chatRoomId}`),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useGetChatRoom;
