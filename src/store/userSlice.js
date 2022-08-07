import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    uid: '',
    email: '',
  },
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      state.user.uid = action.payload.uid;
      state.user.email = action.payload.email;
      state.loading = false;
    },
    clearUserAction: (state) => {
      state.user.uid = null;
      state.user.email = null;
      state.loading = false;
    },
  },
});

export const { setUserAction, clearUserAction } = userSlice.actions;
export default userSlice.reducer;
