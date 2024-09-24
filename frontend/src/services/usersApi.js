import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: routes.baseUrl }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: routes.login,
        method: 'POST',
        body: userData,
      }),
    }),
    signupUser: builder.mutation({
      query: (userData) => ({
        url: routes.signUp,
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useSignupUserMutation } = usersApi;
