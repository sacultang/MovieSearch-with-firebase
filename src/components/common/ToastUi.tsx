import React, { memo } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Collapse from '@mui/material/Collapse/Collapse';
import Alert from '@mui/material/Alert/Alert';

const ToastUi = () => {
  const { isOpen, text } = useSelector((state: RootState) => state.toast.toast);
  return (
    <Collapse in={isOpen}>
      {isOpen && (
        <Alert
          variant="filled"
          sx={{
            position: 'fixed',
            bottom: '5%',
            left: '5%',
            zIndex: 9999,
            backgroundColor: 'secondary.main',
            padding: '15px 30px',
          }}
        >
          {text}
        </Alert>
      )}
    </Collapse>
  );
};

export default memo(ToastUi);
