import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import ChatAvatars from './ChatAvatars';

import useGetChatRooms from '../../hooks/chatRoom/useGetChatRooms';

import { useAuthContext } from '../../context/authContext';

export interface OnMessageClickParams {
  chatRoomId: string;
  receiverId: number;
  lastReadMessageId: number;
}

interface Props {
  onMessageClick: ({
    chatRoomId,
    receiverId,
    lastReadMessageId,
  }: OnMessageClickParams) => void;
}

const textStyles = {
  fontFamily: 'inherit',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

export default function ChatRooms({ onMessageClick }: Props) {
  const { currentUser } = useAuthContext();

  const { id: currentUserId, name: currentUserName } = currentUser || {};
  const { data: chatRooms } = useGetChatRooms(currentUserId as number);

  const handleMessageClick = ({
    chatRoomId,
    receiverId,
    lastReadMessageId,
  }: OnMessageClickParams) => {
    onMessageClick({ chatRoomId, receiverId, lastReadMessageId });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        p: 1,
        top: 60,
        right: 20,
        width: 350,
        minHeight: 500,
        maxHeight: '90vh',
        overflowY: 'scroll',
      }}>
      <Typography variant='h3' sx={{ fontSize: '1.7rem', fontWeight: 800 }}>
        Chats
      </Typography>

      {chatRooms &&
        chatRooms.map(({ id, buyer, seller, product, messages }) => {
          if (messages.length === 0) return;

          const { content, sender } = messages[0];
          const senderName =
            sender.name === currentUserName ? 'You' : sender.name;
          const receiverId = seller.id !== currentUserId ? seller.id : buyer.id;

          return (
            <Box key={id} sx={{ pt: 1 }}>
              <Stack
                direction='row'
                onClick={() =>
                  handleMessageClick({
                    chatRoomId: id,
                    receiverId,
                    lastReadMessageId: messages[0].id,
                  })
                }
                sx={{
                  width: '100%',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background-color 0.1s ease',
                  '&:hover': {
                    backgroundColor: '#eaeaea',
                    cursor: 'pointer',
                  },
                }}>
                <Box
                  sx={{
                    ml: 1,
                    mr: 4,
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <ChatAvatars
                      sellerName={seller.name}
                      buyerName={buyer.name}
                    />
                  </Box>
                </Box>
                <Stack sx={{ width: '75%' }} spacing={0.3}>
                  <Typography
                    sx={{
                      fontSize: '.95rem',
                      color: 'black',
                      ...textStyles,
                    }}
                    variant='h3'>
                    {buyer.name} · {product.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '.8rem',
                      color: 'gray',
                      ...textStyles,
                    }}
                    variant='h6'>
                    {senderName}: {content}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          );
        })}
    </Paper>
  );
}