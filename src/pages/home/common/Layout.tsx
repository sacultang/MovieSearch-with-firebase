import { lazy, Suspense } from 'react';

import Footer from '../../../components/common/Footer';
import ScrollToTop from '../../../components/common/ScrollToTop';
import Loader from '../../../components/common/Loader';

import styled from '@emotion/styled';
const AppBar = lazy(() => import('../../../components/common/AppBar'));
const ToastUi = lazy(() => import('../../../components/common/ToastUi'));
const CreateListModal = lazy(
  () => import('../../../components/listModal/CreateListModal')
);
const LoginAlertModal = lazy(
  () => import('../../../components/loginAlertModal/LoginAlertModal')
);
const Layout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ToastUi />
      <CreateListModal />
      <LoginAlertModal />

      <Wrapper>
        <AppBar />
      </Wrapper>
      <ScrollToTop />
      <Footer />
    </Suspense>
  );
};

export default Layout;

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  position: relative;
`;
