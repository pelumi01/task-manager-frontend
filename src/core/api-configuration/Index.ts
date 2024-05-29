import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_HOST,
  prepareHeaders: (headers) => {
    // set headers
    //   headers.set("authorization", '');
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: [''],
  endpoints: () => ({}),
  keepUnusedDataFor: 10,
});
