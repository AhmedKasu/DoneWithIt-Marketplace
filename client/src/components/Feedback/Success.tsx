import MuiAlert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

interface Props {
  message: string;
  open: boolean;
  testId?: string;
}

export default function Success({
  message,
  open,
  testId = 'success-alert',
}: Props) {
  return (
    <Collapse in={open}>
      <MuiAlert id={testId} severity='success' sx={{ mb: 5 }}>
        {message}
      </MuiAlert>
    </Collapse>
  );
}
