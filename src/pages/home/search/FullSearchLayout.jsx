import SearchInput from '../Header';
import { Box } from '@mui/material';
const FullSearchLayout = () => {
  return (
    <Box sx={{ height: 300, overflow: 'hidden' }}>
      <SearchInput />
    </Box>
  );
};

export default FullSearchLayout;
