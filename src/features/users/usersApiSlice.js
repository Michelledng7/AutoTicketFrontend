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
		addNewUser: builder.mutation({
			query: (initialUserData) => ({
				url: '/users',
				method: 'POST',
				body: {
					...initialUserData,
				},
			}),
			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),
		updateUser: builder.mutation({
			query: (initialUserData) => ({
				url: '/users',
				method: 'PATCH',
				body: { ...initialUserData },
			}),
			invalidatesTags: (result, error, arg) => [
				{
					type: 'User',
					id: arg.id,
				},
			],
		}),
		deleteUser: builder.mutation({
			query: ({ id }) => ({
				url: `/users`,
				method: 'DELETE',
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{
					type: 'User',
					id: arg.id,
				},
			],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useAddNewUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = usersApiSlice;
//return query result object
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
