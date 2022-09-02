import { lazy, Suspense } from 'react';
import AppBar from '../../../components/common/AppBar';
import Footer from '../../../components/common/Footer';
import ScrollToTop from '../../../components/common/ScrollToTop';
import Loader from '../../../components/common/Loader';

import styled from '@emotion/styled';
const ToastUi = lazy(() => import('../../../components/common/ToastUi'));
const CreateListModal = lazy(
  () => import('../../../components/listModal/CreateListModal')
);
const LoginAlertModal = lazy(
  () => import('../../../components/loginAlertModal/LoginAlertModal')
);
const Layout = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ToastUi />
        <CreateListModal />
        <LoginAlertModal />
      </Suspense>
      <Wrapper>
        <AppBar />
      </Wrapper>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  position: relative;
`;
