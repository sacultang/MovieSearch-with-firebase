import styled from '@emotion/styled';
import Box from '@mui/material/Box';

interface ScrollWarpBoxProps {
  children: React.ReactNode;
}
const ScrollWrapBox = ({ children }: ScrollWarpBoxProps) => {
  return <ScrollBox>{children}</ScrollBox>;
};

export default ScrollWrapBox;
const ScrollBox = styled(Box)`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 1px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.07);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--main-bg-color);
    border-radius: 4px;
  }
`;
