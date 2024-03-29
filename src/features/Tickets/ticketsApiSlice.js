import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const ticketsAdapter = createEntityAdapter({
	sortComparer: (a, b) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
})
const initialState = ticketsAdapter.getInitialState()

export const ticketsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getTickets: builder.query({
			query: () => ({
				url: '/tickets',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError
				},
			}),
			transformResponse: responseData => {
				const ticketsData = responseData.map(item => {
					item.id = item._id
					return item
				})
				return ticketsAdapter.setAll(initialState, ticketsData)
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						{ type: 'Ticket', id: 'LIST' },
						...result.ids.map(id => ({ type: 'Ticket', id })),
					]
				} else return [{ type: 'Ticket', id: 'LIST' }]
			},
		}),
		addNewTicket: builder.mutation({
			query: newTicket => ({
				url: '/tickets',
				method: 'POST',
				body: { ...newTicket },
			}),
			invalidatesTag: [{ type: 'Ticket', id: 'LIST' }],
		}),
		updateTicket: builder.mutation({
			query: updatedTicket => ({
				url: '/tickets',
				method: 'PATCH',
				body: { ...updatedTicket },
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Ticket', id: arg.id }],
		}),
		deleteTicket: builder.mutation({
			query: ({ id }) => ({
				url: `/tickets`,
				method: 'DELETE',
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Ticket', id: arg.id }],
		}),
	}),
})

export const {
	useGetTicketsQuery,
	useAddNewTicketMutation,
	useUpdateTicketMutation,
	useDeleteTicketMutation,
} = ticketsApiSlice

export const selectTicketsResult = ticketsApiSlice.endpoints.getTickets.select()

//create memoized selectors
const selectTicketsData = createSelector(
	selectTicketsResult,
	ticketsResult => ticketsResult.data //data is normalized state object with ids and entities
)

//getSelectors creates these selectors
export const {
	selectAll: selectAllTickets,
	selectById: selectTicketById,
	selectIds: selectTicketIds,
} = ticketsAdapter.getSelectors(
	state => selectTicketsData(state) ?? initialState
)
