import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';
//assign the token to the headers
const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5500',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		console.log(token);
		if (token) {
			//set headers to be 'Bearer token'
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
	console.log(args); // request url, method, body
	console.log(api); //sinal, dispatch, getState()
	console.log(extraOptions); //custom like {shout: true}

	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 403) {
		console.log('sending refresh token');
		//send refresh token to get new access token
		const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
		if (refreshResult?.data) {
			//store the new token
			console.log(refreshResult.data);
			api.dispatch(setCredentials({ ...refreshResult.data }));
			//retry the original request with the new token
			result = await baseQuery(args, api, extraOptions);
			console.log(result);
		} else {
			if (refreshResult?.error?.status === 403) {
				//if refresh token is expired, logout
				refreshResult.error.data.message = 'Your login has expired. ';
			}
			return refreshResult;
		}
	}
	console.log(result);
	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth,
	tagTypes: ['Ticket', 'User'], //invalidate the cache
	endpoints: (builder) => ({}),
});
