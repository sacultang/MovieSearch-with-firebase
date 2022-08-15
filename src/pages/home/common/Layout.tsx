import { lazy, Suspense } from 'react';
import AppBar from '../../../components/Common/AppBar';
import Footer from '../../../components/Common/Footer';
import ScrollToTop from '../../../components/Common/ScrollToTop';
import Loader from '../../../components/Common/Loader';

import styled from '@emotion/styled';
const ToastUi = lazy(() => import('../../../components/Common/ToastUi'));
const CreateListModal = lazy(
  () => import('../../../components/ListModal/CreateListModal')
);
const LoginAlertModal = lazy(
  () => import('../../../components/LoginAlertModal/LoginAlertModal')
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
