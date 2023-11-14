import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  name: string;
}

export default function ImagePicker({ name }: Props) {
  const [previews, setPreviews] = useState<Array<string | ArrayBuffer>>([]);

  const {
    formState: { errors, isDirty },
    register,
    setValue,
    trigger,
  } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const newPreviews: Array<string | ArrayBuffer> = [];

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = function () {
          const dataUrl = reader.result;

          if (typeof dataUrl !== 'string') return;

          newPreviews.push(dataUrl);
          setPreviews([...newPreviews, ...previews]);
        };

        reader.readAsDataURL(file);
      });
    },
    [previews]
  );

  useEffect(() => {
    setValue(name, previews, { shouldDirty: previews.length > 0 });
    if (isDirty) trigger(name);
  }, [previews, setValue, name, trigger, isDirty]);

  const removeImage = (index: number) => {
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        'image/png': ['.png'],
        'image/jpg': ['.jpg'],
      },
      multiple: true,
    });

  const validationError = errors[name];
  const previewsAvailable: boolean = previews.length > 0;
  const maxPreviewsReached: boolean = previews.length >= 4;

  const borderColor = validationError ? 'error.main' : '#cccccc';
  const dropzoneStyle = {
    border: `1px solid ${borderColor}`,
    marginLeft: previewsAvailable ? '7px' : '0px',
    height: '200px',
    width: previewsAvailable ? '150px' : '100%',
    minWidth: '150px',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center' as const,
    cursor: 'pointer',
  };

  console.log('files to upload', acceptedFiles);
  const inputRef = register(name);
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'row-reverse',
          overflowX: 'scroll',
        }}>
        {!maxPreviewsReached && (
          <Box {...getRootProps()} style={dropzoneStyle}>
            <input {...inputRef} {...getInputProps()} {...register(name)} />
            {isDragActive ? (
              <p>Drop here ...</p>
            ) : (
              <Stack direction='column' spacing={1}>
                <Typography sx={{ fontWeight: 800 }}>Add Photos</Typography>
                <Typography>or drag and drop</Typography>
              </Stack>
            )}
          </Box>
        )}
        {previews.map((preview, index) => (
          <Box key={index} sx={{ ml: 1, position: 'relative' }}>
            <img
              src={preview as string}
              alt={`Upload preview ${index + 1}`}
              width={150}
              height={200}
              style={{ borderRadius: '4px' }}
            />
            <Box
              onClick={() => removeImage(index)}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                m: 1,
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
              <CloseIcon sx={{ color: 'black', fontSize: 15 }} />
            </Box>
          </Box>
        ))}
      </Box>
      {validationError && (
        <Typography color='error' sx={{ fontSize: 12, ml: 1, mt: 0.2 }}>
          {validationError.message as string}
        </Typography>
      )}
    </Grid>
  );
}
