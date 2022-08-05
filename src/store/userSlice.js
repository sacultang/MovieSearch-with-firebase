import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction: (state, action) => {},
  },
});

export const { setUserAction } = userSlice.actions;
export default userSlice.reducer;
