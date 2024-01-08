import React from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Product } from '../../types';

interface LongMenuProps {
  productStatus: Product['status'];
  onPendingClick: () => void;
  onViewClick: () => void;
  onDeleteClick: () => void;
}

export default function LongMenu({
  productStatus,
  onPendingClick,
  onViewClick,
  onDeleteClick,
}: LongMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePendingClick = () => {
    setAnchorEl(null);
    onPendingClick();
  };

  const handleDeleteClick = () => {
    setAnchorEl(null);
    onDeleteClick();
  };

  return (
    <div>
      <IconButton
        sx={{
          width: '50px',
          height: { xs: '30px', md: '35px' },
          ml: 1,
          backgroundColor: '#E5E4E2',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: '#D3D3D3',
            cursor: 'pointer',
          },
        }}
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 150,
              width: 200,
            },
          },
        }}>
        {productStatus !== 'pending' && (
          <MenuItem onClick={handlePendingClick}>
            <ListItemIcon>
              <PauseCircleOutlineIcon fontSize='medium' />
            </ListItemIcon>
            <ListItemText>Mark as Pending</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={onViewClick}>
          <ListItemIcon>
            <PreviewIcon fontSize='medium' />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize='medium' />
          </ListItemIcon>
          <ListItemText>Delete Listing</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
