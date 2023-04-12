import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MessageResponse, Option, RegisterData } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<MessageResponse, RegisterData>({
      query(data) {
        return {
          url: 'auth/singup',
          method: 'POST',
          body: data,
        };
      },
    }),
    resendEmail: builder.mutation<MessageResponse, string>({
      query(email) {
        return {
          url: `auth/re-confirm`,
          method: 'POST',
          body: { email },
        };
      },
    }),
    getSpecialities: builder.query<Option[], null>({
      query() {
        return {
          url: 'specialities',
        };
      },
    }),

    verifyEmail: builder.query<MessageResponse, { token: string | null }>({
      query({ token }) {
        return {
          url: `auth/confirm/${token}`,
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useResendEmailMutation,
  useVerifyEmailQuery,
  useGetSpecialitiesQuery,
} = authApi;