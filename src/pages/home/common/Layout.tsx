import PersistentDrawerLeft from '../../../components/Common/Drawer';
import Footer from '../../../components/Common/Footer';
import styled from '@emotion/styled';
import ToastUi from '../../../components/Common/ToastUi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import ScrollToTop from '../../../components/Common/ScrollToTop';
const Layout = () => {
  const toast = useSelector((state: RootState) => state.toast.toast);
  return (
    <>
      <ToastUi toast={toast} />
      <Wrapper>
        <PersistentDrawerLeft />
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
