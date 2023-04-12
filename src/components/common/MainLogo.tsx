import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
interface MainLogoProp {
  drawer?: boolean;
}
const MainLogo = ({ drawer }: MainLogoProp) => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        minHeight: 64,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link to="/" aria-label="go to main-page">
        <LogoDiv aria-hidden={true}>
          <div>메인</div>
        </LogoDiv>
      </Link>
      {drawer && (
        <Link to="/">
          <Typography
            variant="h6"
            fontWeight={600}
            fontSize={'1.2rem'}
            color="#fff"
          >
            O-Movie
          </Typography>
        </Link>
      )}
    </Box>
  );
};

export default MainLogo;

const LogoDiv = styled.div`
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #8360c3;
  background: -webkit-linear-gradient(to right, #2ebf91, #8360c3);
  background: linear-gradient(to right, #2ebf91, #8360c3);
  margin-right: 20px;
  div {
    visibility: hidden;
  }
`;
