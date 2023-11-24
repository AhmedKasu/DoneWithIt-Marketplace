import MuiAlert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

interface Props {
  message: string;
  open: boolean;
}

export default function Error({ message, open }: Props) {
  return (
    <Collapse in={open}>
      <MuiAlert severity='error' sx={{ mb: 5 }}>
        {message}
      </MuiAlert>
    </Collapse>
  );
}
