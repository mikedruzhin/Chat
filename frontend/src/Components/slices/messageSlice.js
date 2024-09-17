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
      console.log('Ошибка при загрузке сообщений:', error);
      throw error;
    }
  },
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ message, token }) => {
    try {
      const response = await axios.post(routes.messages, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
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
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;