import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material';
interface ScrollWarpBoxProps {
  children: React.ReactNode;
  credit?: string;
}
const ScrollWrapBox = ({ children, credit }: ScrollWarpBoxProps) => {
  const theme = useTheme();
  return (
    <ScrollBox credit={credit} theme={theme}>
      {children}
    </ScrollBox>
  );
};

export default ScrollWrapBox;
const ScrollBox = styled(Box)<{ credit: string | undefined; theme: Theme }>`
  min-height: ${({ credit }) => (credit ? '406px' : '434px')};
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 1px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 4px;
  }
`;
