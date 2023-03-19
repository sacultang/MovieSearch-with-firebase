import React, { useCallback, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { theme } from '../../theme';
interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPage: number;
}
const PaginationComp = ({ setPage, page, totalPage }: PaginationProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<unknown>, value: number) => {
      e.preventDefault();
      setPage(value);
    },
    [setPage]
  );
  return (
    <>
      <Divider sx={{ pt: 4 }} />
      <Stack alignItems={'center'}>
        <Pagination
          page={page}
          count={totalPage > 40 ? 40 : totalPage}
          showFirstButton
          showLastButton
          onChange={handleChange}
          color={`${theme.palette.mode}` === 'dark' ? 'standard' : 'primary'}
          sx={{ pt: 4, pb: 4 }}
        />
      </Stack>
    </>
  );
};

export default PaginationComp;
