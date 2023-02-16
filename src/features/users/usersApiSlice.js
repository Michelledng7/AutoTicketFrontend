import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => '/users',
			validateStatus: (response, result) => {
				return response.status === 200 && !result.isError;
			},
			transformResponse: (responseData) => {
				const usersData = responseData.map((item) => {
					item.id = item._id;
					return item;
				});
				return usersAdapter.setAll(initialState, usersData);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						{ type: 'User', id: 'LIST' },
						...result.ids.map((id) => ({ type: 'User', id })),
					];
				} else return [{ type: 'User', id: 'LIST' }];
			},
		}),
	}),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();
//create memoized selectors
const selectUsersData = createSelector(
	selectUsersResult,
	(usersResult) => usersResult.data //data is normalized state object with ids and entities
);

//getSelectors creates these slectors
export const {
	selectAll: selectAllUsers,
	selectById: selectUserById,
	selectIds: selectUserIds,
} = usersAdapter.getSelectors(
	(state) => selectUsersData(state) ?? initialState
);
