import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/Types';
interface IState {
  user: UserType;
  loading: boolean;
}

const initialState: IState = {
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
    setUserAction: (state: IState, action: PayloadAction<UserType>) => {
      state.user.uid = action.payload.uid;
      state.user.email = action.payload.email;
      state.loading = false;
    },
    clearUserAction: (state: IState) => {
      state.user.uid = null;
      state.user.email = null;
      state.loading = false;
    },
  },
});

export const { setUserAction, clearUserAction } = userSlice.actions;
export default userSlice.reducer;
