import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack/Stack';

const Loader = () => {
  return (
    <Stack alignItems="center" justifyContent="center" height="100vh">
      <CircularProgress color="secondary" size={50} />
    </Stack>
  );
};

export default Loader;
