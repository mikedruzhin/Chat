import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

export const fetchMessages = createAsyncThunk(
  'channels/fetchMessages',
  async (token) => {
    try {
      const response = await axios.get(routes.messages, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error('Server Error!');
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    status: null,
    error: null,
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.channels = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;