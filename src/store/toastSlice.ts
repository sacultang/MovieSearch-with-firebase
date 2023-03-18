import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  isOpen: boolean;
  text?: string;
}
interface IState {
  toast: Toast;
  listModal: boolean;
  loginAlert: boolean;
}
const initialState: IState = {
  toast: {
    isOpen: false,
    text: undefined,
  },
  listModal: false,
  loginAlert: false,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToastAction: (state: IState, action: PayloadAction<Toast>) => {
      state.toast = action.payload;
    },
    setListModalAction: (state: IState, action: PayloadAction<boolean>) => {
      state.listModal = action.payload;
    },
    setLoginAlertAction: (state: IState, action: PayloadAction<boolean>) => {
      state.loginAlert = action.payload;
    },
  },
});

export const { setToastAction, setListModalAction, setLoginAlertAction } =
  toastSlice.actions;
export default toastSlice.reducer;
