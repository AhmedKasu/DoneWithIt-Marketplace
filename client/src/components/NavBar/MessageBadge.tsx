import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

import MessageIcon from './MessageIcon';

interface Props {
  unreadMessages: number;
  onBadgeClick: () => void;
  isBadgeClicked: boolean;
  size?: number;
}

export default function MessageBadge({
  onBadgeClick,
  isBadgeClicked,
  unreadMessages,
  size = 20,
}: Props) {
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
