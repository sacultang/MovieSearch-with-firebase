import React, { memo } from 'react';
import { Alert, Collapse } from '@mui/material';
import Portal from '../../Portal';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
const ToastUi = () => {
  const { isOpen, text } = useSelector((state: RootState) => state.toast.toast);
  return (
    <Portal>
      <Collapse in={isOpen}>
        {isOpen && (
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
            {text}
          </Alert>
        )}
      </Collapse>
    </Portal>
  );
};

export default memo(ToastUi);
