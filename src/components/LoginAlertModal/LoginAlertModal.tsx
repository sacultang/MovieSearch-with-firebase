import { useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginAlertAction } from '../../store/toastSlice';
const LoginAlertModal = () => {
  const loginAlert = useSelector((state: RootState) => state.toast.loginAlert);
  const dispatch = useDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(setLoginAlertAction(false));
  }, [dispatch]);
  return (
    <Dialog onClose={handleCloseModal} open={loginAlert}>
      <DialogTitle>로그인이 필요한 서비스입니다.</DialogTitle>
      <DialogContent>
        <Link to="/login" onClick={handleCloseModal}>
          <DialogContentText
            variant="body1"
            color="primary"
            sx={{ textDecoration: 'underline', display: 'flex' }}
          >
            <ArrowRightIcon />
            로그인 하시겠습니까?
          </DialogContentText>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default LoginAlertModal;
