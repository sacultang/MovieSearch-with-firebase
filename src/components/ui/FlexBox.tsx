import { CSSProperties } from 'react';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material/Box';

export interface FlexBoxProps extends BoxProps {
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
  flex?: CSSProperties['flex'];
}

const FlexBox = ({
  children,
  flexDirection,
  justifyContent,
  alignItems,
  flex,
  gap,
  ...props
}: FlexBoxProps) => {
  return (
    <Box
      sx={{
        alignItems,
        flexDirection,
        justifyContent,
        flex,
        gap,
        display: 'flex',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FlexBox;
