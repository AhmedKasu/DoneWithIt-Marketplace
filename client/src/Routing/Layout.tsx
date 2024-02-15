import { Outlet } from 'react-router';
import Box from '@mui/material/Box';

import NavBar from '../components/NavBar/NavBar';
import ChatRoom from '../components/ChatRoom';

import { useChatRoomContext } from '../context/ChatRoomContext';
import { useAuthContext } from '../context/authContext';

import useRefetchCurrentUser from '../hooks/user/useRefetchCurrentUser';

export default function Layout() {
  useRefetchCurrentUser();
  const { openChatRooms } = useChatRoomContext();
  const { currentUser } = useAuthContext();

  return (
    <>
      <NavBar />
      {currentUser &&
        openChatRooms.map((chatRoomId) => (
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
