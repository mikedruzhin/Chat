/* eslint-disable no-param-reassign */
//import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import routes from '../../routes';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('user') || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logoutUser(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.username = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    logIn(state, { payload }) {
      console.log({ payload })
      state.username = payload.username;
      state.status = 'succeeded';
      state.token = payload.token;
      state.error = null;
    },
  },
});

export const { logoutUser, logIn } = authSlice.actions;

export default authSlice.reducer;
