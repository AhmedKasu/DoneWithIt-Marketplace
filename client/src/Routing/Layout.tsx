import { Outlet } from 'react-router';
import Box from '@mui/material/Box';

import NavBar from '../components/NavBar/NavBar';
import ChatRoom from '../components/ChatRoom';

import { useChatRoomContext } from '../context/ChatRoomContext';
import { useAuthContext } from '../context/authContext';
import { useScreenBreakingPoints } from '../context/screenBreakpoints';

import useRefetchCurrentUser from '../hooks/user/useRefetchCurrentUser';

export default function Layout() {
  useRefetchCurrentUser();
  const { openChatRooms } = useChatRoomContext();
  const { currentUser } = useAuthContext();
  const { isExtraSmallScreen, isSmallScreen, isMediumScreen } =
    useScreenBreakingPoints();

  const chatsOpenAtATime = isExtraSmallScreen
    ? 1
    : isSmallScreen || isMediumScreen
    ? 2
    : 3;

  return (
    <>
      <NavBar />
      {currentUser &&
        openChatRooms.slice(0, chatsOpenAtATime).map((chatRoomId, index) => (
          <Box
            key={chatRoomId}
            sx={{
              zIndex: 999,
              position: 'fixed',
              bottom: 0,
              right: { xs: 10, sm: 15 + index * 305, md: 30 + index * 350 },
            }}>
            <ChatRoom chatRoomId={chatRoomId} />
          </Box>
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
