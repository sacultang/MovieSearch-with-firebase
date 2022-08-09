import PersistentDrawerLeft from '../../../components/Common/Drawer';
import Footer from '../../../components/Common/Footer';
import styled from '@emotion/styled';
const Layout = () => {
  return (
    <>
      <Wrapper>
        <PersistentDrawerLeft />
      </Wrapper>
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
