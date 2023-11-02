import React from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import UserAvatar from './UserAvatar';

interface Props {
  currentUser: string | null;
  handleSignupClick: () => void;
  handleSigninClick: () => void;
  handleSignoutClick: () => void;
}

export default function UserProfileIcon({
  currentUser,
  handleSigninClick,
  handleSignoutClick,
  handleSignupClick,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Box>
        <Tooltip title='Current User'>
          <IconButton
            onClick={handleAvatar}
            size='large'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}>
            <Avatar
              sx={{
                width: { xs: 25, sm: 30, md: 35, lg: 40 },
                height: { xs: 25, sm: 30, md: 35, lg: 40 },
              }}>
              {currentUser ? <UserAvatar name={currentUser} /> : <Avatar />}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem>
          <Avatar
            sx={{
              width: { xs: 18, sm: 20, md: 23, lg: 25 },
              height: { xs: 18, sm: 20, md: 23, lg: 25 },
              mr: 2,
            }}
          />{' '}
          {currentUser ? currentUser : 'Guest'}
        </MenuItem>
        <Divider />
        {currentUser ? (
          <MenuItem onClick={handleSignoutClick}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Signout
          </MenuItem>
        ) : (
          <Box>
            <MenuItem onClick={handleSigninClick}>
              <ListItemIcon>
                <Login fontSize='small' />
              </ListItemIcon>
              Signin
            </MenuItem>
            <MenuItem onClick={handleSignupClick}>
              <ListItemIcon>
                <PersonAddAltIcon fontSize='small' />
              </ListItemIcon>
              Signup
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  );
}
