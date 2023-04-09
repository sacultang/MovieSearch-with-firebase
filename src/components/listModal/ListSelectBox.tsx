import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface ListSelectBoxProps {
  setOpenAddList: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectList: React.Dispatch<React.SetStateAction<string>>;
  selectList: string;
}
const ListSelectBox = ({
  setOpenAddList,
  setSelectList,
  selectList,
}: ListSelectBoxProps) => {
  const myList = useSelector((state: RootState) => state.listMovie.list);

  const selectChangeList = (e: SelectChangeEvent) => {
    setSelectList(e.target.value);
  };
  return (
    <DialogContent sx={{ overflowY: 'visible' }}>
      {myList ? (
        <FormControl fullWidth>
          <InputLabel id="select-label">List</InputLabel>
          <Select
            fullWidth
            labelId="select-label"
            id="select"
            value={selectList}
            label="list"
            onChange={selectChangeList}
          >
            {myList.map((list) => (
              <MenuItem value={decodeURIComponent(list.id)} key={list.id}>
                {decodeURIComponent(list.id)}
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
