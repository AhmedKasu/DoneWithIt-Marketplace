import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RecyclingIcon from '@mui/icons-material/Recycling';
import Stack from '@mui/material/Stack';

import { Toolbar } from '@mui/material';

import UserProfileIcon from './UserProfileIcon';
import MessageBadge from './MessageBadge';
import ChatRooms, { OnMessageClickParams } from '../ChatRoom/ChatRooms';

import useSignout from '../../hooks/auth/useSignOut';
import useResetFilters from '../../hooks/product/useResetFilters';

import { useFiltersContext } from '../../context/FiltersContext';
import { useSocketContext } from '../../context/SocketContext';
import { useAuthContext } from '../../context/authContext';
import { useChatRoomContext } from '../../context/ChatRoomContext';

import { ChatRoom } from '../../types';

function NavBar() {
  const [openMessages, setOpenMessages] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState<ChatRoom['id'][]>([]);

  const navigate = useNavigate();
  const { mutate: signout } = useSignout();
  const resetFilters = useResetFilters();

  const { setCategoryId } = useFiltersContext();
  const { currentUser } = useAuthContext();
  const { setOpenChatRooms, openChatRooms } = useChatRoomContext();
  const { socket } = useSocketContext();

  const handleAppLogoClick = () => {
    resetFilters();
    setCategoryId(undefined);
  };

  const handleMessageClick = ({
    chatRoomId,
    receiverId,
    lastReadMessageId,
  }: OnMessageClickParams) => {
    socket?.emit('existing_chat', {
      chatRoomId,
      receiverId,
      lastReadMessageId,
    });

    const chatRoomIsOpen = openChatRooms.includes(chatRoomId);
    if (!chatRoomIsOpen) {
      setOpenChatRooms((openChatRooms) => [...openChatRooms, chatRoomId]);
    }

    setOpenMessages(false);

    const updatedUnreadMessages = unreadMessages.filter(
      (room) => room !== chatRoomId
    );
    setUnreadMessages([...updatedUnreadMessages]);
  };

  const openChatRoomsRef = useRef(openChatRooms);
  openChatRoomsRef.current = openChatRooms;

  useEffect(() => {
    const receivedMessageHandler = ({ chatRoomId }: { chatRoomId: string }) => {
      const chatRoomIsOpen = openChatRoomsRef.current.includes(chatRoomId);
      if (chatRoomIsOpen) return;

      setUnreadMessages((unreadMessages) => [...unreadMessages, chatRoomId]);
    };

    socket?.on('new_chat', ({ chatRoomId }: { chatRoomId: string }) => {
      socket?.emit('join_chat', { chatRoomId });
    });

    socket?.on('receive_message', receivedMessageHandler);

    return () => {
      socket?.off('receive_message', receivedMessageHandler);
      socket?.off('new_chat');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <AppBar elevation={1} sx={{ backgroundColor: 'appBg.navbar' }}>
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Toolbar>
          <Tooltip title='Go home'>
            <RouterLink to='/'>
              <RecyclingIcon
                onClick={handleAppLogoClick}
                sx={{ display: { md: 'flex', color: 'red' }, mr: 1 }}
              />
            </RouterLink>
          </Tooltip>

          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: { xs: '.9rem', sm: '1rem', md: '1.2rem', lg: '1.3rem' },
              letterSpacing: { md: '.1rem', lg: '.2rem' },
              color: 'red',
              textDecoration: 'none',
            }}>
            DoneWithIt
          </Typography>
        </Toolbar>

        <Stack
          direction='row'
          spacing={-2}
          sx={{
            alignItems: 'center',
          }}>
          {currentUser && (
            <MessageBadge
              unreadMessages={unreadMessages.length}
              setUnreadMessages={setUnreadMessages}
              onBadgeClick={() =>
                setOpenMessages((openMessages) => !openMessages)
              }
              isBadgeClicked={openMessages}
              currentUserId={currentUser.id}
            />
          )}

          {openMessages && currentUser && (
            <ChatRooms onMessageClick={handleMessageClick} />
          )}

          <UserProfileIcon
            currentUser={currentUser?.name}
            handleSigninClick={() => navigate('/signin')}
            handleSignoutClick={() => signout()}
            handleSignupClick={() => navigate('/signup')}
          />
        </Stack>
      </Container>
    </AppBar>
  );
}
export default NavBar;
