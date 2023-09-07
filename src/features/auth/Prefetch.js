import { store } from '../../app/store';
import { ticketsApiSlice } from '../Tickets/ticketApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
	useEffect(() => {
		console.log('Subscribing');
		const tickets = store.dispatch(
			ticketsApiSlice.endpoints.getTickets.initiate()
		);
		const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

		return () => {
			console.log('Unsubscribing');
			tickets.unsubscribe();
			users.unsubscribe();
		};
	}, []);
	return <Outlet />;
};

export default Prefetch;
