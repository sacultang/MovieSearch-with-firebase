import React, { ChangeEvent } from 'react';
import { DialogContentText, TextField, Box } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps {
  handleChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeDetail: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CreateListInput = ({ handleChangeName, handleChangeDetail }: IProps) => {
  return (
    <Box>
      <DialogTitle>목록 생성</DialogTitle>
      <DialogContent>
        <DialogContentText>목록 이름과 설명을 입력해주세요</DialogContentText>
        <TextField
          autoFocus
          autoComplete="off"
          margin="dense"
          label="목록 이름"
          type="text"
          variant="standard"
          fullWidth
          onChange={handleChangeName}
        />
        <TextField
          margin="dense"
          label="설명"
          type="text"
          variant="standard"
          fullWidth
          onChange={handleChangeDetail}
        />
      </DialogContent>
    </Box>
  );
};

export default CreateListInput;
