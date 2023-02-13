import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const ticketsAdapter = createEntityAdapter({});
const initialState = ticketsAdapter.getInitialState();

export const ticketsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTickets: builder.query({
			query: () => '/tickets',
			validateStatus: (response, result) => {
				return response.status === 200 && !result.isError;
			},
			transformResponse: (responseData) => {
				const ticketsData = responseData.map((item) => {
					ticket.id = item._id;
					return item;
				});
				return ticketsAdapter.setAll(initialState, ticketsData);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						{ type: 'Ticket', id: 'LIST' },
						...result.ids.map((id) => ({ type: 'Ticket', id })),
					];
				} else return [{ type: 'Ticket', id: 'LIST' }];
			},
		}),
	}),
});

export const { useGetTicketsQuery } = ticketsApiSlice;

export const selectTicketsResult =
	ticketsApiSlice.endpoints.getTickets.select();
//create memoized selectors
const selectTicketsData = createSelector(
	selectTicketsResult,
	(ticketsResult) => ticketsResult.data //data is normalized state object with ids and entities
);

//getSelectors creates these slectors
export const {
	selectAll: selectAlltickets,
	selectById: selectTicketById,
	selectIds: selectTicketIds,
} = ticketsAdapter.getSelectors(
	(state) => selectTicketsData(state) ?? initialState
);
