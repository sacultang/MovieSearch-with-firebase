import { lazy, Suspense } from 'react';
import AppMenuBar from '../../../components/common/AppBar';
const ToastUi = lazy(() => import('../../../components/common/ToastUi'));
const CreateListModal = lazy(
  () => import('../../../components/listModal/CreateListModal')
);
const LoginAlertModal = lazy(
  () => import('../../../components/loginAlertModal/LoginAlertModal')
);
const ScrollToTop = lazy(
  () => import('../../../components/common/ScrollToTop')
);

const Layout = () => {
  return (
    <Suspense fallback={<></>}>
      <ToastUi />
      <CreateListModal />
      <LoginAlertModal />
      <AppMenuBar />
      <ScrollToTop />
    </Suspense>
  );
};

export default Layout;
