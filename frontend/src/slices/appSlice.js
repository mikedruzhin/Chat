/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannelId: '1',
  modalInfo: { type: null, item: null },
};

const appSlice = createSlice({
  name: 'appControl',
  initialState,
  reducers: {
    setActiveChannelId(state, { payload }) {
      state.activeChannelId = payload;
    },
    showModal(state, { payload }) {
      state.modalInfo = payload;
    },
    hideModal(state) {
      state.modalInfo = { type: null, item: null };
    },
  },
});

export const { setActiveChannelId, showModal, hideModal } = appSlice.actions;
export default appSlice.reducer;
