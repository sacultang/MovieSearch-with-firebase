import React, { ChangeEvent } from 'react';
import { TextField, Box } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps {
  handleListNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CreateListInput = ({ handleListNameChange }: IProps) => {
  return (
    <Box>
      <DialogTitle>목록 생성</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          autoComplete="off"
          margin="dense"
          label="목록 이름"
          type="text"
          variant="standard"
          fullWidth
          onChange={handleListNameChange}
        />
      </DialogContent>
    </Box>
  );
};

export default CreateListInput;
