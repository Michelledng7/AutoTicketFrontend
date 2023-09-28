import { useParams } from 'react-router-dom'
//import { useSelector } from 'react-redux'
import { useGetTicketsQuery } from './ticketsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
// import { selectTicketById } from './ticketsApiSlice';
// import { selectAllUsers } from '../users/usersApiSlice';
import EditTicketForm from './EditTicketForm'
import useAuth from '../../hooks/useAuth'

const EditTicket = () => {
	const { isManager, isAdmin } = useAuth()
	const { id } = useParams()

	// const ticket = useSelector((state) => selectTicketById(state, id));
	// const users = useSelector(selectAllUsers);

	const { ticket } = useGetTicketsQuery('ticketList', {
		selectFromResult: ({ data }) => ({
			ticket: data.entities[id],
		}),
	})

	const { users } = useGetUsersQuery('userList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map(id => data?.entities[id]),
		}),
	})
	console.log(users)

	if (!isManager && !isAdmin) {
		return <p className='errmsg'>No access permission</p>
	}

	const content =
		ticket && users ? (
			<EditTicketForm ticket={ticket} users={users} />
		) : (
			<p> Loading ...</p>
		)
	return content
}

export default EditTicket
