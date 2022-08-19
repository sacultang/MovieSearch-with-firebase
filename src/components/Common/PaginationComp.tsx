import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
interface IProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}
const PaginationComp = ({ setPage, page }: IProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    e.preventDefault();
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
