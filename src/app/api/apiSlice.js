import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5500',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			//set headers to be 'Bearer token'
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ['users', 'tickets'], //invalidate the cache
	endpoints: (builder) => ({}),
});
