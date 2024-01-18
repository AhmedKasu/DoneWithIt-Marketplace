import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

import MessageIcon from './MessageIcon';

interface Props {
  unreadMessages?: number;
  onBadgeClick: () => void;
}

export default function MessageBadge({
  onBadgeClick,
  unreadMessages = 0,
}: Props) {
  return (
    <Box onClick={onBadgeClick}>
      <Badge badgeContent={unreadMessages} color='primary'>
        <MessageIcon />
      </Badge>
    </Box>
  );
}
