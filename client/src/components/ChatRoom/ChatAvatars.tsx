import Box from '@mui/material/Box';

import UserAvatar from '../NavBar/UserAvatar';

interface Props {
  sellerName: string;
  buyerName: string;
  size?: number;
}

export default function ChatAvatars({
  sellerName,
  buyerName,
  size = 35,
}: Props) {
  const avatarStyles = {
    width: size,
    height: size,
    fontSize: `${size / 2.5}px`,
    position: 'relative',
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <UserAvatar
        name={sellerName}
        isCurrentUser
        styles={{
          ...avatarStyles,

          left: `${(size / 35) * 1.2}rem`,
          top: `${(size / 35) * 0.7}rem`,
        }}
      />
      <UserAvatar
        name={buyerName}
        isCurrentUser
        styles={{
          ...avatarStyles,
          bottom: '.5rem',
        }}
      />
    </Box>
  );
}
