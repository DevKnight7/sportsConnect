import { createSlice } from '@reduxjs/toolkit';

export interface ReducerState {
  isLoggedIn: boolean;
  userPayload: any
}

const initialState: ReducerState = {
  isLoggedIn: false,
  userPayload: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, value) => {
      state.isLoggedIn = true;
      state.userPayload = value.payload;
    },
    signOutSuccess: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setIsLoggedIn, signOutSuccess } = authSlice.actions;



export default authSlice.reducer;


