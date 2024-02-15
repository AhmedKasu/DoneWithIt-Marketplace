import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import { useChatRoomContext } from '../context/ChatRoomContext';

import useRefetchCurrentUser from '../hooks/user/useRefetchCurrentUser';
import { useAuthContext } from '../context/authContext';

import NavBar from '../components/NavBar/NavBar';
import ChatRoom from '../components/ChatRoom';

export default function PrivateRoutes() {
  useRefetchCurrentUser();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const { openChatRooms } = useChatRoomContext();

  useEffect(() => {
    if (currentUser === null) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  return (
    <>
      <NavBar />
      {openChatRooms.map((chatRoomId) => (
        <ChatRoom key={chatRoomId} chatRoomId={chatRoomId} />
      ))}
      <Box
        sx={{
          mt: 2,
          backgroundColor: 'appBg.main',
          position: 'fixed',
          width: '100%',
        }}>
        <Outlet />
      </Box>
    </>
  );
}
