import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import '../../firebase';
import { Dialog, DialogActions, Button } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CreateListInput from './CreateListInput';
import useAddList from './hooks/useAddList';
import ListSelectBox from './ListSelectBox';

const CreateListModal = () => {
  const [openAddList, setOpenAddList] = useState(false);
  const modalOpen = useSelector((state: RootState) => state.toast.listModal);
  const {
    handleAddList,
    handleListNameChange,
    handleClose,
    selectList,
    setSelectList,
  } = useAddList(openAddList, setOpenAddList);

  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>목록에 추가</DialogTitle>
      {openAddList ? (
        <CreateListInput handleListNameChange={handleListNameChange} />
      ) : (
        <ListSelectBox
          setOpenAddList={setOpenAddList}
          selectList={selectList}
          setSelectList={setSelectList}
        />
      )}
      <DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            취소
          </Button>
          <Button onClick={handleAddList} variant="contained">
            추가
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListModal;
