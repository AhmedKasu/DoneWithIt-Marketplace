import { useQuery } from '@tanstack/react-query';

import APIClient from '../../services/apiClient';
import { CustomAxiosError, ChatRoom } from '../../types';

const useGetChatRooms = (chatRoomId: number) => {
  const apiClient = new APIClient<ChatRoom>(`/chat-rooms/user/${chatRoomId}`);
  return useQuery<ChatRoom[], CustomAxiosError>({
    queryKey: ['user-chat-rooms', chatRoomId],
    queryFn: apiClient.getAll,
  });
};

export default useGetChatRooms;
