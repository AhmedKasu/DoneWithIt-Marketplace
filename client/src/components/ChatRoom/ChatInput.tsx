import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import SendIcon from '@mui/icons-material/Send';
import ToolTip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import TextInput from '../Forms/TextInput';
import Form from '../Forms';

import { chatSchema } from '../../utils/validation/chat';

export type FormData = z.infer<typeof chatSchema>;

interface Props {
  onSubmit: (variables: FormData) => void;
}

export default function ChatInput({ onSubmit }: Props) {
  const methods = useForm<FormData>({
    mode: 'onSubmit',
    resolver: zodResolver(chatSchema),
  });

  const { formState, reset } = methods;

  const handleSubmit = (variables: FieldValues) => {
    onSubmit(variables as FormData);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit}>
        <Box sx={{ flex: 1 }}>
          <TextInput
            name='message'
            label=''
            showHelperText={false}
            otherProps={{
              placeholder: 'Aa',
              fullWidth: true,
              autoComplete: 'off',
              autoFocus: true,
              multiline: true,
              maxRows: 5,
              variant: 'standard',
              size: 'small',
              InputProps: {
                inputProps: {
                  maxLength: 500,
                  sx: {
                    p: 1,
                    pl: 1.5,
                    borderRadius: 5,
                    backgroundColor: '#eceff1',
                  },
                },
              },
              sx: {
                '& .MuiInput-underline:before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:after': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottom: 'none',
                },
              },
            }}
          />
        </Box>

        {formState.isDirty && (
          <Box sx={{ width: 45 }}>
            <Box
              sx={{
                position: 'absolute',
                bottom: 11,
                right: 7,
              }}>
              <ToolTip title='Press enter to send'>
                <IconButton
                  type='submit'
                  sx={{
                    p: 0.8,
                    pl: 0,
                    cursor: 'pointer',
                  }}>
                  <SendIcon sx={{ color: 'primary.main', ml: 2 }} />
                </IconButton>
              </ToolTip>
            </Box>
          </Box>
        )}
      </Form>
    </FormProvider>
  );
}
