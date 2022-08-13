import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  toast: boolean;
  listModal: boolean;
  loginAlert: boolean;
}
const initialState: IState = {
  toast: false,
  listModal: false,
  loginAlert: false,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToastAction: (state: IState, action: PayloadAction<boolean>) => {
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
