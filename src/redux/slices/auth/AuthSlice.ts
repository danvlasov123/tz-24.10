'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TypeInitialState = {
  isAuth: boolean;
  username: string;
};

const initialState: TypeInitialState = {
  isAuth: false,
  username: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSuccessAuth(state, action: PayloadAction<{ username: string }>) {
      state.isAuth = true;
      state.username = action.payload.username;
    },
    clear(state) {
      state.isAuth = false;
      state.username = '';
    },
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
