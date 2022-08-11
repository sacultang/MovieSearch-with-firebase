import React from 'react';
import { Box, Alert, Collapse } from '@mui/material';
import Portal from '../../Portal';
interface IProps {
  toast: boolean;
}
const ToastUi = ({ toast }: IProps) => {
  return (
    <Portal>
      <Collapse in={toast}>
        <Alert
          variant="filled"
          sx={{
            position: 'fixed',
            bottom: '5%',
            left: '5%',
            zIndex: 9999,
            backgroundColor: '#444444',
            padding: '15px 30px',
          }}
        >
          즐겨찾기에 추가되었습니다.
        </Alert>
      </Collapse>
    </Portal>
  );
};

export default ToastUi;
