import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  toast: boolean;
}
const initialState: IState = {
  toast: false,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToastAction: (state: IState, action: PayloadAction<boolean>) => {
      state.toast = action.payload;
    },
  },
});

export const { setToastAction } = toastSlice.actions;
export default toastSlice.reducer;
