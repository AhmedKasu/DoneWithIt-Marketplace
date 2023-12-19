import MuiAlert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

interface Props {
  message: string;
  open: boolean;
}

export default function Success({ message, open }: Props) {
  return (
    <Collapse in={open}>
      <MuiAlert id='success-alert' severity='success' sx={{ mb: 5 }}>
        {message}
      </MuiAlert>
    </Collapse>
  );
}
