import MuiAlert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

interface Props {
  message: string;
  open: boolean;
  testId?: string;
}

export default function Error({
  message,
  open,
  testId = 'error-alert',
}: Props) {
  return (
    <Collapse in={open}>
      <MuiAlert id={testId} severity='error' sx={{ mb: 5 }}>
        {message}
      </MuiAlert>
    </Collapse>
  );
}
