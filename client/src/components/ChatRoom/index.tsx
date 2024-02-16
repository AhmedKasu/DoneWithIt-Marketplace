import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import ChatInput, { FormData } from './ChatInput';
import ChatAvatars from './ChatAvatars';

import { useSocketContext } from '../../context/SocketContext';
import { useChatRoomContext } from '../../context/ChatRoomContext';
import { useAuthContext } from '../../context/authContext';

import useGetChatRoom from '../../hooks/chatRoom/useGetChatRoom';

import { Message, ChatRoomMessage } from '../../types';

interface Props {
  chatRoomId: string;
}

const productTitleStyles = {
  fontFamily: 'inherit',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

export default function ChatRoom({ chatRoomId: dbChatRoomId }: Props) {
  const [liveMessages, setLiveMessages] = useState<
    Array<Omit<ChatRoomMessage, 'id'>>
  >([]);

  const { data: chatRoom } = useGetChatRoom(dbChatRoomId);

  const {
    messages: dbMessages = [],
    product: dbProduct,
    buyer: dbBuyer,
    seller: dbSeller,
  } = chatRoom || {};

  const { socket } = useSocketContext();

  const {
    chatRoomId: initialChatRoomId,
    openChatRooms,
    setOpenChatRooms,
  } = useChatRoomContext();

  const { currentUser } = useAuthContext();

  const { id: senderId, name: senderName } = currentUser || {};
  const chatRoomId = initialChatRoomId || dbChatRoomId;
  const allMessages = [...dbMessages, ...liveMessages];

  useEffect(() => {
    const messageHandler = ({ content, senderId, chatRoomId }: Message) => {
      if (chatRoomId !== dbChatRoomId) return;

      setLiveMessages((liveMessages) => [
        ...liveMessages,
        { content, senderId },
      ]);
    };

    socket?.on('receive_message', messageHandler);

    return () => {
      socket?.off('receive_message', messageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleSubmit = ({ message }: FormData) => {
    if (!senderId || !senderName || !chatRoomId) return;

    if (chatRoomId !== dbChatRoomId) return;
    const newMessage: Omit<Message, 'id'> = {
      chatRoomId,
      senderId,
      content: message,
    };
    socket?.emit('send_message', newMessage);

    setLiveMessages((liveMessages) => [
      ...liveMessages,
      { content: message, senderId },
    ]);
  };

  const handleChatClose = () => {
    const updatedChatRooms = openChatRooms.filter(
      (room) => room !== chatRoomId
    );
    setOpenChatRooms(updatedChatRooms);
  };

  const navigate = useNavigate();

  const handleSeeDatailsClick = () => {
    handleChatClose();
    navigate(`products/${dbProduct?.id}`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: 300, md: 340 },
        height: 455,
      }}>
      {chatRoom && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              height: 50,
              boxShadow: 1,
            }}>
            <ChatAvatars
              sellerName={dbSeller?.name as string}
              buyerName={dbBuyer?.name as string}
              size={25}
            />

            <Box sx={{ display: 'flex', width: '70%', ml: { xs: 2, md: 1 } }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  ...productTitleStyles,
                }}>
                {dbBuyer?.name} · {dbProduct?.title}
              </Typography>
            </Box>

            <IconButton onClick={handleChatClose}>
              <CloseIcon sx={{ color: 'black' }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              height: 100,
            }}>
            <Box sx={{ display: 'flex', p: 1 }}>
              <Box
                sx={{
                  ml: 1.5,
                  mr: 2,
                  height: 35,
                  width: 35,
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}>
                <img
                  src={dbProduct?.imageUrls[0]}
                  alt={dbProduct?.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Box>
                <Typography sx={{ color: 'gray', fontSize: '.8rem' }}>
                  Marketplace
                </Typography>
                <Typography sx={{ ...productTitleStyles, fontSize: '.9rem' }}>
                  €{dbProduct?.price} - {dbProduct?.title}
                </Typography>
              </Box>
            </Box>
            <Button
              variant='contained'
              disableElevation
              onClick={handleSeeDatailsClick}
              sx={{
                width: '90%',
                ml: 2,
                backgroundColor: '#e0e0e0',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#bdbdbd',
                },
              }}>
              See details
            </Button>
          </Box>
        </>
      )}
      <Divider sx={{ height: 11 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: 300,
          overflowY: 'scroll',
        }}>
        <Box
          sx={{
            overflowY: 'auto',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            {allMessages.map((m, i) => {
              const isSentMessage = m.senderId === senderId;
              return (
                <Chip
                  key={i}
                  sx={{
                    alignSelf: isSentMessage ? 'flex-end' : 'flex-start',
                    bgcolor: isSentMessage ? '#1877F2' : undefined,
                    color: isSentMessage ? 'white' : undefined,
                    m: 1,
                    mb: 0,
                    p: 1,
                    height: 'auto',
                    maxWidth: '75%',
                    '& .MuiChip-label': {
                      display: 'block',
                      whiteSpace: 'normal',
                      fontSize: '0.8rem',
                    },
                  }}
                  label={m.content}
                />
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            padding: 1.5,
          }}>
          <Box sx={{ ml: 2, pt: 1.5 }}>
            <ChatInput onSubmit={handleSubmit} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
