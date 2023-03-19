import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  barOpen: boolean;
}
const initialState: InitialState = {
  barOpen: false,
};

export const barOpenCloseSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setBarOpen: (state: InitialState, action: PayloadAction<boolean>) => {
      state.barOpen = action.payload;
    },
  },
});

export const { setBarOpen } = barOpenCloseSlice.actions;
export default barOpenCloseSlice.reducer;
