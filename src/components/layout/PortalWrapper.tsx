import Portal from '@mui/material/Portal';
import ToastUi from '../common/ToastUi';
import CreateListModal from '../listModal/CreateListModal';
import LoginAlertModal from '../loginAlertModal/LoginAlertModal';
import ScrollToTop from '../common/ScrollToTop';

const PortalWrapper = () => {
  return (
    <Portal>
      <ToastUi />
      <CreateListModal />
      <LoginAlertModal />
      <ScrollToTop />
    </Portal>
  );
};

export default PortalWrapper;
