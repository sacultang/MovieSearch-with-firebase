import styled from '@emotion/styled';
import Box from '@mui/material/Box';

interface ScrollWarpBoxProps {
  children: React.ReactNode;
  credit?: string;
}
const ScrollWrapBox = ({ children, credit }: ScrollWarpBoxProps) => {
  return <ScrollBox credit={credit}>{children}</ScrollBox>;
};

export default ScrollWrapBox;
const ScrollBox = styled(Box)<{ credit: string | undefined }>`
  min-height: ${({ credit }) => (credit ? '406px' : '434px')};
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
