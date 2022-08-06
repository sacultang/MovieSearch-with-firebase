import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from 'react-router-dom';
const PopupModal = ({ onClose, open }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>로그인이 필요한 서비스입니다.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Link to="/login">
            <Typography
              variant="body"
              color="primary"
              sx={{ textDecoration: 'underline', display: 'flex' }}
            >
              <ArrowRightIcon /> 로그인 하시겠습니까?
            </Typography>
          </Link>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default PopupModal;
