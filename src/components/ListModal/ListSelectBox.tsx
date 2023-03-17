import React, { useCallback } from 'react';
import {
  DialogActions,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { SelectChangeEvent } from '@mui/material/Select';

interface IProps {
  setSelectList: React.Dispatch<React.SetStateAction<string>>;
  selectList: string;
  setOpenAddList: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListSelectBox = ({
  setSelectList,
  selectList,
  setOpenAddList,
}: IProps) => {
  const fireList = useSelector((state: RootState) => state.listMovie.list);
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setSelectList(event.target.value as string);
    },
    [setSelectList]
  );
  return (
    <DialogContent sx={{ overflowY: 'visible' }}>
      {fireList ? (
        <FormControl fullWidth>
          <InputLabel id="select-label">List</InputLabel>
          <Select
            fullWidth
            labelId="select-label"
            id="select"
            value={selectList}
            label="list"
            onChange={handleChange}
          >
            {fireList.map((list) => (
              <MenuItem value={list.id} key={list.id}>
                {list.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        '목록이 없습니다'
      )}
      <DialogActions>
        <Button color="info" onClick={() => setOpenAddList(true)}>
          <AddCircleOutlineIcon />
          목록 생성하기
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default ListSelectBox;
