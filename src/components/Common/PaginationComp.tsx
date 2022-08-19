import React, { useCallback, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface IProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  pathname: string;
}
const PaginationComp = ({ setPage, page, pathname }: IProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    setPage(1);
  }, [pathname]);
  const handleChange = useCallback(
    (e: React.ChangeEvent<unknown>, value: number) => {
      e.preventDefault();
      setPage(value);
    },
    [setPage]
  );
  return (
    <Stack alignItems={'center'}>
      <Pagination
        page={page}
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
