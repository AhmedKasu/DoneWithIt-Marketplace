import { useEffect } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

import MessageIcon from './MessageIcon';

import useGetChatRooms from '../../hooks/chatRoom/useGetChatRooms';

import { useChatRoomContext } from '../../context/ChatRoomContext';
interface Props {
  unreadMessages: number;
  setUnreadMessages: React.Dispatch<React.SetStateAction<string[]>>;
  onBadgeClick: () => void;
  isBadgeClicked: boolean;
  currentUserId: number;
  size?: number;
}

export default function MessageBadge({
  onBadgeClick,
  isBadgeClicked,
  unreadMessages,
  setUnreadMessages,
  currentUserId,
  size = 20,
}: Props) {
  const { data: chatRooms } = useGetChatRooms(currentUserId);
  const { openChatRooms } = useChatRoomContext();

  useEffect(() => {
    if (!chatRooms) return;

    const dbUnreadMessages = chatRooms.reduce<string[]>((acc, room) => {
      if (room.messages.length === 0 || openChatRooms.includes(room.id))
        return acc;

      const lastMessage = room.messages[0];

      if (lastMessage.sender.id === currentUserId) return acc;

      if (room.lastReadMessage.id !== room.messages[0].id) {
        return [...acc, room.id];
      }
      return acc;
    }, []);

    if (dbUnreadMessages.length === 0) return;

    setUnreadMessages(dbUnreadMessages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRooms, currentUserId]);

  const boxSize = size + 16;
  const iconColor = isBadgeClicked ? '#1778F2' : 'black';
  const iconWrapperColor = isBadgeClicked ? '#dfe3ee' : '#e9ebee';

  return (
    <Box onClick={onBadgeClick}>
      <Badge badgeContent={unreadMessages} color='error'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: boxSize,
            backgroundColor: iconWrapperColor,
            height: boxSize,
            borderRadius: boxSize / 2,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#d8dadb',
              cursor: 'pointer',
            },
          }}>
          <MessageIcon size={size} color={iconColor} />
        </Box>
      </Badge>
    </Box>
  );
}
