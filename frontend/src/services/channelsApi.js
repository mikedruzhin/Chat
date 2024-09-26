import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes';
import setHeaders from '../utils/setHeaders';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.baseUrl,
    prepareHeaders: setHeaders,
  }),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => routes.channels,
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channels,
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),
    editChannel: builder.mutation({
      query: ({ id, body }) => ({
        url: `${routes.channels}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `${routes.channels}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
});

export const {
  useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation,
} = channelsApi;
