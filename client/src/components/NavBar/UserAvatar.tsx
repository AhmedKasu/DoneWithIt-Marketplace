import Avatar from '@mui/material/Avatar';
import { SxProps } from '@mui/material/styles';

interface Props {
  name: string;
  size?: { xs: number; sm: number; md: number; lg: number };
  styles?: SxProps;
  isCurrentUser: boolean;
}

export default function UserAvatar({
  name,
  size = { xs: 25, sm: 30, md: 35, lg: 35 },
  styles,
  isCurrentUser,
}: Props) {
  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const getInitials = (name: string) => {
    const splitName = name.split(' ');

    if (splitName.length > 1) {
      return `${splitName[0][0]}${splitName[1][0]}`;
    } else {
      return splitName[0][0];
    }
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: size,
        height: size,
        fontSize: {
          xs: `${size.xs / 2.5}px`,
          sm: `${size.sm / 2.5}px`,
          md: `${size.md / 2.5}px`,
          lg: `${size.lg / 2.5}px`,
        },
        ...styles,
      },
      children: `${getInitials(name)}`,
    };
  };

  return isCurrentUser ? (
    <Avatar {...stringAvatar(name)} />
  ) : (
    <Avatar sx={{ ...styles }} />
  );
}
