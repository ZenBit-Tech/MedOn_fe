import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './fetchInterface';

export const fetchDataApi = createApi({
  reducerPath: 'fetchDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/users',
  }),
  endpoints: (builder) => ({
    // query is for getting data
    // mutation is for updating, deleting data

    // first type is the expected return type of the query, and the second type is type of the query
    getUsersData: builder.query<User[], string>({
      // id for example, inserted here
      query: () => '',
    }),
  }),
});

// hook generated by createApi in fetchDataApi automatically
export const { useGetUsersDataQuery } = fetchDataApi;