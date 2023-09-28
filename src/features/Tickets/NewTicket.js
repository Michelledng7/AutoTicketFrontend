// import { useSelector } from 'react-redux';
// import { selectAllUsers } from '../users/usersApiSlice';
import NewTicketForm from './NewTicketForm'
import { useGetUsersQuery } from '../users/usersApiSlice'

const NewTicket = () => {
	//const users = useSelector(selectAllUsers);
	const { users } = useGetUsersQuery('userList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map(userId => data?.entities[userId]),
		}),
	})
	console.log(users)
	if (!users?.length) return <p>Not Currently Available</p>
	const content = <NewTicketForm users={users} />

	return content
}

export default NewTicket
