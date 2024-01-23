import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

import MessageIcon from './MessageIcon';

interface Props {
  unreadMessages?: number;
  onBadgeClick: () => void;
  size?: number;
}

export default function MessageBadge({
  onBadgeClick,
  unreadMessages = 0,
  size = 18,
}: Props) {
  const boxSize = size + 18;
  return (
    <Box onClick={onBadgeClick}>
      <Badge badgeContent={unreadMessages} color='primary'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: boxSize,
            backgroundColor: '#e9ebee',
            height: boxSize,
            borderRadius: boxSize / 2,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#d8dadb',
              cursor: 'pointer',
            },
          }}>
          <MessageIcon size={size} />
        </Box>
      </Badge>
    </Box>
  );
}
