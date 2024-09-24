import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().users;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => routes.messages,
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messages,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
