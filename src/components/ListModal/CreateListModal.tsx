import React, { useState, useCallback, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { setListModalAction } from '../../store/toastSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { doc, collection, setDoc, deleteDoc } from 'firebase/firestore';
import '../../firebase';
import { db } from '../../firebase';
const CreateListModal = () => {
  const modalOpen = useSelector((state: RootState) => state.toast.listModal);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [listName, setListName] = useState('');
  const [listDetail, setListDetail] = useState('');

  const handleClose = useCallback(() => {
    dispatch(setListModalAction(false));
  }, [dispatch]);
  const handleChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setListName(e.target.value),
    []
  );
  const handleChangeDetail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setListDetail(e.target.value),
    []
  );
  const handleSubmit = () => {
    if (user?.uid) {
      const docRef = doc(db, 'users', user.email!);
    }
  };
  return (
    <Dialog open={modalOpen} onClose={handleClose}>
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

      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          취소
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          생성
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateListModal;
