import { lazy, Suspense } from 'react';
import styled from '@emotion/styled';
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
      <Wrapper>
        <AppMenuBar />
      </Wrapper>
      <ScrollToTop />
    </Suspense>
  );
};

export default Layout;

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  position: relative;
`;
