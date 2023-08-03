import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  themeMode: boolean;
}
const initialState: InitialState = {
  themeMode: false,
};

export const themeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    setThemeAction: (state: InitialState, action: PayloadAction<boolean>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeAction } = themeSlice.actions;
export default themeSlice.reducer;
