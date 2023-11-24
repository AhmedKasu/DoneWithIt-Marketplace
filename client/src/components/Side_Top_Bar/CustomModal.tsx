import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps, Theme } from '@mui/material';

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  pb: 2,
};

interface Props {
  modalTitle: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CustomModal({
  modalTitle,
  open,
  onClose,
  children,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Paper
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ m: 2, ml: { sm: 20 }, fontWeight: 800 }}>
            {modalTitle}
          </Typography>

          <Box
            onClick={onClose}
            sx={{
              mr: 2,
              p: 0.5,
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#e9ebee',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#D3D3D3',
                cursor: 'pointer',
              },
            }}>
            <CloseIcon sx={{ color: 'black' }} />
          </Box>
        </Paper>

        <Box sx={{ ml: 2 }}>{children}</Box>
      </Box>
    </Modal>
  );
}
