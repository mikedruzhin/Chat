import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import { usersApi } from '../../services/usersApi.js';
import { channelsApi } from '../../services/channelsApi.js';
import { messagesApi } from '../../services/messagesApi.js';

const store = configureStore({
  reducer: {
    users: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    usersApi.middleware,
    channelsApi.middleware,
    messagesApi.middleware,
  ),
});

export default store;
