import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    try {
      const response = await axios.get(routes.channels, {
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

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    status: null,
    error: null,
  },
  reducers: {
    addChannel(state, action) {
      state.channels.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addChannel } = channelSlice.actions;
export default channelSlice.reducer;