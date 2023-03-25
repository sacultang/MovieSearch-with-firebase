import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/userType';
interface IState {
  user: UserType;
}

const initialState: IState = {
  user: {
    uid: '',
    email: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction: (state: IState, action: PayloadAction<UserType>) => {
      state.user.uid = action.payload.uid;
      state.user.email = action.payload.email;
    },
    clearUserAction: (state: IState) => {
      state.user.uid = null;
      state.user.email = null;
    },
  },
});

export const { setUserAction, clearUserAction } = userSlice.actions;
export default userSlice.reducer;
