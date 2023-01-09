import { createSlice } from '@reduxjs/toolkit';

export interface ReducerState {
  newMatch: number;
  endMatch: number;
}

const initialState: ReducerState = {
  newMatch: 0,
  endMatch: 0
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setNewMatchAlert: (state, value) => {
      state.newMatch = value.payload;
    },
    setEndMatchAlert: (state, value) => {
      state.endMatch = value.payload;
    },
  },
});

export const { setNewMatchAlert, setEndMatchAlert } = alertSlice.actions;



export default alertSlice.reducer;


