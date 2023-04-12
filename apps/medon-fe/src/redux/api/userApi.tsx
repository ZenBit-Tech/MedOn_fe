import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';
import { IUser } from './types';

export interface MessageResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).userState;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getUser: builder.query<IUser, null>({
      query() {
        return {
          // TODO:
          url: 'user/profile',
        };
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;