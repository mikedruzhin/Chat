/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('user') || null,
    token: localStorage.getItem('token') || null,
    loggedIn: false,
    error: null,
  },
  reducers: {
    logoutUser(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.username = null;
      state.token = null;
      state.loggedIn = false;
      state.error = null;
    },
    logInUser(state, { payload }) {
      state.username = payload.username;
      state.loggedIn = true;
      state.token = payload.token;
      state.error = null;
    },
  },
});

export const { logoutUser, logInUser } = authSlice.actions;

export default authSlice.reducer;
