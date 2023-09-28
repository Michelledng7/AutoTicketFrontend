import { store } from '../../app/store'
import { ticketsApiSlice } from '../Tickets/ticketsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
	useEffect(() => {
		// console.log('Subscribing')
		// const tickets = store.dispatch(
		// 	ticketsApiSlice.endpoints.getTickets.initiate()
		// )
		// const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
		// 	return () => {
		// 		console.log('Unsubscribing')
		// 		tickets.unsubscribe()
		// 		users.unsubscribe()
		// 	}
		// }, [])

		//	use built-in prefetch
		store.dispatch(
			ticketsApiSlice.util.prefetch('getTickets', 'ticketList', { force: true }) //endpoint, name, force to refetch
		)
		store.dispatch(
			usersApiSlice.util.prefetch('getUsers', 'userList', { force: true })
		)
	}, [])

	return <Outlet />
}

export default Prefetch
