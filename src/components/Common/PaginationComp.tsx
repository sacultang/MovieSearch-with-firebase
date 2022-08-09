import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
interface IProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const PaginationComp = ({ setPage }: IProps) => {
  const handleChange = (e: any, value: number) => {
    setPage(value);
  };
  return (
    <Stack alignItems={'center'}>
      <Pagination
        count={40}
        showFirstButton
        showLastButton
        onChange={handleChange}
        color="primary"
        sx={{ pt: 2, pb: 2 }}
      />
    </Stack>
  );
};

export default PaginationComp;
