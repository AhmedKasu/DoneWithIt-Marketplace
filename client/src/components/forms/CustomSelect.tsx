import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { SxProps } from '@mui/system';

interface Props {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
  selectedOption: string | undefined;
}

const chevronColor = '#6b6b6b';
const radioColor = 'primary.main';
const boxStyles: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '10px',
  transition: 'background-color 0.1s ease',
  '&:hover': {
    backgroundColor: '#f7f7f7',
    cursor: 'pointer',
  },
};

export default function CustomSelect({
  label,
  options,
  onSelect,
  selectedOption,
}: Props) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleBoxClick = (option: string) => {
    onSelect(option);
  };

  return (
    <List>
      <Box
        onClick={() => setOpenMenu(!openMenu)}
        sx={{
          p: 1.2,
          width: '95%',
          ...boxStyles,
        }}>
        <Typography sx={{ fontSize: '.9rem', fontWeight: 600 }}>
          {label}
        </Typography>
        {!openMenu && <ExpandMoreIcon sx={{ color: chevronColor }} />}
        {openMenu && <ExpandLessIcon sx={{ color: chevronColor }} />}
      </Box>
      {options.map((option) => {
        if (openMenu)
          return (
            <Box
              key={option}
              onClick={() => handleBoxClick(option)}
              sx={{
                ml: 1,
                p: 1.5,
                width: '93%',
                ...boxStyles,
              }}>
              <Typography>{option}</Typography>
              {selectedOption === option ? (
                <RadioButtonCheckedIcon sx={{ color: radioColor }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ color: radioColor }} />
              )}
            </Box>
          );
      })}
    </List>
  );
}
