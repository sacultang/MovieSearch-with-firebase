import styled from '@emotion/styled';
import FlexBox from '../ui/FlexBox';
import ListItemLink from '../ui/ListItemLink';

const MainLogo = () => {
  return (
    <FlexBox justifyContent="center" alignItems="center" minHeight={64}>
      <ListItemLink
        to="/"
        aria-label="go to main-page"
        primary={<LogoDiv aria-label="logo" />}
      />
    </FlexBox>
  );
};

export default MainLogo;

const LogoDiv = styled.span`
  display: block;
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #8360c3;
  background: -webkit-linear-gradient(to right, #2ebf91, #8360c3);
  background: linear-gradient(to right, #2ebf91, #8360c3);
  margin-right: 20px;
`;
