import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      console.log(action);
      state.user = action.payload;
      state.loading = false;
    },
    clearUserAction: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUserAction, clearUserAction } = userSlice.actions;
export default userSlice.reducer;
